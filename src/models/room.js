const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  messages: {
    type: [String],
    default: [],
  },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
