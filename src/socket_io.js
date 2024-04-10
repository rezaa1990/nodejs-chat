const { Server } = require("socket.io");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    // Joining a room
    const room = "room100";
      socket.join(room);

    // Listening for messages from a specific room
    socket.on("sendMessage", (data) => {
      const { room, message } = data;
      io.to(room).emit("message", message);
      console.log(`Message received in room ${room}: ${message}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = initializeSocket;
