const express = require('express');
const morgan = require('morgan');
const verificationRoutes = require('./routes/verificationRoutes');
const apiKeyAuth = require('./middleware/apiKeyAuth');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/verify', apiKeyAuth, verificationRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'Unexpected server error' });
});

module.exports = app;
