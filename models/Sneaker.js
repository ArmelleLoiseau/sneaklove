const { model, Schema } = require("mongoose");

const sneakerSchema = new Schema({
  name: String,
  ref: String,
  size: [Number],
  description: String,
  price: Number,
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dznbfuvat/image/upload/v1642104826/sneakers/shoe_igncvj.png",
  },
  category: {
    type: [String],
    enum: ["men", "women", "kids"],
  },
  id_tags: {
    type: [Schema.Types.ObjectId],
    ref: "tags",
  },
});

const Sneaker = model("sneakers", sneakerSchema);

module.exports = Sneaker;
