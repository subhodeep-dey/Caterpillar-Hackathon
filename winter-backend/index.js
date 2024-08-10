require('dotenv').config();
require('./config/database.js');

const config = require('./config/config.js').getConfig();
const PORT = config.PORT || 3000;

console.log('✔ Winter-Backend');
console.log(`✔ Mode: ${config.MODE}`);
console.log(`✔ Port: ${PORT}`);

const { server } = require('./config/server.js');

// For local development
if (process.env.NODE_ENV !== 'production') {
  server.listen(PORT, () => {
    console.log('✔ Application Started');
  }).on('error', (err) => {
    console.log('✘ Application failed to start');
    console.error('✘', err.message);
    process.exit(1);
  });
}

// Export the Express app as a request handler function
module.exports = server;