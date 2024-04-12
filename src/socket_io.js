const { Server } = require("socket.io");
const Room = require("./../src/models/room");

function initializeSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinRoom", (room) => {
      console.log("data:", room);
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    const Room = require("./models/room");

    socket.on("sendMessage", async (data) => {
      const { room: receivedRoom, message, loginedUser, selectedUser } = data;
      console.log("room, message", receivedRoom, message);
      try {
        let room = await Room.findOne({ _id: receivedRoom });
        if (!room) {
          room = await Room.create({ _id: receivedRoom });
          await room.save();
          console.log(`Room "${receivedRoom}" created.`);
        }
        // Add message to the respective room's messages array
        room.messages.push(message);
        await room.save();
        io.to(receivedRoom).emit("message", { room: receivedRoom, message });
        console.log(`Message received in room ${receivedRoom}: ${message}`);
      } catch (error) {
        console.error("Error occurred while handling sendMessage:", error);
      }
    });
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = initializeSocket;
