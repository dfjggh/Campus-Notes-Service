const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function createApp(dataFile) {
  const file = dataFile || process.env.DATA_FILE || path.join(__dirname, '..', 'data', 'notes.json');

  const load = () => {
    try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return []; }
  };
  const save = (notes) => {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, JSON.stringify(notes, null, 2));
  };

  const app = express();
  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime() }));

  app.get('/api/notes', (req, res) => res.json(load()));

  app.post('/api/notes', (req, res) => {
    const { title, content, course } = req.body || {};
    if (!title || !title.trim()) return res.status(400).json({ error: 'title is required' });
    const note = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: (content || '').trim(),
      course: (course || 'General').trim(),
      createdAt: new Date().toISOString(),
    };
    const notes = load();
    notes.unshift(note);
    save(notes);
    res.status(201).json(note);
  });

  app.delete('/api/notes/:id', (req, res) => {
    const notes = load();
    const next = notes.filter((n) => n.id !== req.params.id);
    if (next.length === notes.length) return res.status(404).json({ error: 'not found' });
    save(next);
    res.status(204).end();
  });

  return app;
}

module.exports = { createApp };
