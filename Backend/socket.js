const { Server } = require('socket.io');
const captainModel = require('./models/captain.model');
const userModel = require('./models/user.model');
let io;
function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*', // or specify frontend URL like http://localhost:5173
      methods: ['GET', 'POST'],
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join', async (data) => {
      const { userId, userType } = data;
      if (userType === 'captain') {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === 'user') {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}


function sendMessageToSocket(messageObject){
    console.log(messageObject);

    if(io){
        io.to(messageObject.socketId).emit(messageObject.event, messageObject.data);
    }
    else{
        console.error('Socket.io is not initialized.');
    }
    
}

module.exports = {
    initializeSocket,
    sendMessageToSocket
};