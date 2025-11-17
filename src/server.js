const app = require('./app');
const { connectDatabase } = require('./config/database');
const { env } = require('./config/environment');

async function start() {
  try {
    await connectDatabase();
    app.listen(env.port, () => {
      console.log(`IPRS API listening on port ${env.port}`);
    });
  } catch (error) {
    console.error('Unable to start server', error);
    process.exit(1);
  }
}

start();
