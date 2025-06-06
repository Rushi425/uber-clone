const http = require('http');
const app = require('./app');
const port = process.env.PORT || 8000; 
const { initializeSocket } = require('./socket');
const { connectToDb } = require('./db/db');

const server = http.createServer(app);

initializeSocket(server);
connectToDb();

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
