const { Server } = require('socket.io');
const captainModel = require('./models/captain.model');
const userModel = require('./models/user.model');
let io;
function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*', 
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

    socket.on('update-location-captain', async (data) =>{
      const { captainId, location } = data;
      if( !captainId || !location.ltd || !location.lng){
        console.error('Invalid data received for update-location-captain:', data);
        return;
      }
      try {
        await captainModel.findByIdAndUpdate(captainId, { location:{
          ltd: location.ltd,
          lng: location.lng
      }});
      } catch (error) {
        console.error(error);
      }
      }
    );

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}


function sendMessageToSocket(socketId, messageObject){

    if(io){
        io.to(socketId).emit(messageObject.event, messageObject.data);
    }
    else{
        console.error('Socket.io is not initialized.');
    }
    
}

module.exports = {
    initializeSocket,
    sendMessageToSocket
};