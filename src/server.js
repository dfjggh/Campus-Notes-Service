const { createApp } = require('./app');
const PORT = process.env.PORT || 3000;
createApp().listen(PORT, '0.0.0.0', () => {
  console.log(`Campus Notes Service running on http://localhost:${PORT}`);
});
