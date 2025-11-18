const crypto = require('crypto');

function generateApiKey(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

const apiKey = generateApiKey();

console.log('Generated API key:');
console.log(apiKey);
console.log(
  '\nCopy this value into your .env as API_KEY (or export API_KEY before running the server).'
);
