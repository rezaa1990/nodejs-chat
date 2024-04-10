const { Server } = require("socket.io");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Dictionary to store messages for each room
  const roomsMessages = {};

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (room) => {
      console.log('data:',room);
      socket.join(room);
      // Initialize message array for each room if not already exist
      if (!roomsMessages[room]) {
        roomsMessages[room] = [];
      }
      console.log(`User joined room: ${room}`);
    });

    socket.on("sendMessage", (data) => {
      const { room, message } = data;
      // Add message to the respective room's messages array
      roomsMessages[room].push(message);
      io.to(room).emit("message", { room, message }); // Send room along with message
      console.log(`Message received in room ${room}: ${message}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = initializeSocket;
