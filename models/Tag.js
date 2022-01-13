const { Schema, model } = require('mongoose');

const tagSchema = new Schema({
  label: String
});

const Tag = model("tag", tagSchema);

module.exports = Tag;
