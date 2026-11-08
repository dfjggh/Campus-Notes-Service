const test = require('node:test');
const assert = require('node:assert');
const os = require('os');
const path = require('path');
const { createApp } = require('../src/app');

function start() {
  const file = path.join(os.tmpdir(), `notes-${Date.now()}-${Math.random()}.json`);
  const server = createApp(file).listen(0);
  return { server, base: `http://127.0.0.1:${server.address().port}` };
}

test('health endpoint returns ok', async () => {
  const { server, base } = start();
  const res = await fetch(`${base}/health`);
  assert.strictEqual(res.status, 200);
  assert.strictEqual((await res.json()).status, 'ok');
  server.close();
});

test('create, list and delete a note', async () => {
  const { server, base } = start();
  const post = await fetch(`${base}/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Docker', content: 'Containers', course: 'OS' }),
  });
  assert.strictEqual(post.status, 201);
  const note = await post.json();
  const list = await (await fetch(`${base}/api/notes`)).json();
  assert.strictEqual(list.length, 1);
  const del = await fetch(`${base}/api/notes/${note.id}`, { method: 'DELETE' });
  assert.strictEqual(del.status, 204);
  server.close();
});

test('rejects note without title', async () => {
  const { server, base } = start();
  const res = await fetch(`${base}/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: 'x' }),
  });
  assert.strictEqual(res.status, 400);
  server.close();
});
