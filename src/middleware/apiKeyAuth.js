const { env } = require('../config/environment');

const HEADER_NAME = 'x-api-key';

function apiKeyAuth(req, res, next) {
  if (!env.apiKey) {
    console.error('API key missing from environment configuration');
    return res
      .status(500)
      .json({ message: 'API key is not configured on this server' });
  }

  const providedKey = req.header(HEADER_NAME);
  if (!providedKey || providedKey !== env.apiKey) {
    return res.status(401).json({ message: 'Invalid or missing API key' });
  }

  return next();
}

module.exports = apiKeyAuth;
