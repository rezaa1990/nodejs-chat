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
    const User = require("./models/user");

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
        let newData = [{ name: room.name, messages: message }];
        io.to(receivedRoom).emit("message", { room, newData });
        console.log(`Message received in room ${receivedRoom}: ${message}`);
      } catch (error) {
        console.error("Error occurred while handling sendMessage:", error);
      }
    });

    socket.on("makeRoom", async (data) => {
      let { loginedUser, selectedUser } = data;
      console.log("makeroomdata", data);

      loginedUser = await User.findOne({ email: loginedUser.email });
      selectedUser = await User.findOne({ email: selectedUser.email });

      const existingRoom = await Room.findOne({
        members: { $all: [loginedUser._id, selectedUser._id] },
      });

      if (existingRoom) {
        io.emit("makeRoomResponse", { room: existingRoom });
      } else {
        const newRoom = new Room({
          name: `${loginedUser.email}-${selectedUser.email}`,
          members: [loginedUser._id, selectedUser._id],
        });
        await newRoom.save();
        loginedUser.rooms.push(newRoom._id);
        await loginedUser.save();
        selectedUser.rooms.push(newRoom._id);
        await selectedUser.save();
        console.log("usersss:", loginedUser, selectedUser);
        io.emit("makeRoomResponse", { room: newRoom });
      }
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = initializeSocket;
