const { Schema, model } = require("mongoose");

const tagSchema = new Schema({
  label: {
    type: String,
    unique: true,
  },
});

const Tag = model("tag", tagSchema);

module.exports = Tag;
