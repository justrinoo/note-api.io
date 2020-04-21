const mongoose = require("mongoose");

const NoteSchema = mongoose.Schema(
  {
    title: String,
    content: String,
  },
  {
    timestamps: true,
  });

const NoteModel = mongoose.model("Note", NoteSchema);

module.exports = NoteModel;
