require("dotenv").config();
require("../../config/mongodb");
const Sneaker = require("../../models/Sneaker");

const sneakers = [
  {
    name: "Angel",
    ref: "1",
    size: 38,
    description: "the best",
    price: 60,
    category: ["women", "kids"],
  },
  {
    name: "Starfish",
    ref: "2",
    size: 40,
    description: "blue",
    price: 120,
    category: ["men", "women", "kids"],
  },
  {
    name: "Supafast",
    ref: "3",
    size: 42,
    description: "to win a marathon",
    price: 200,
    category: ["men", "women"],
  },
  {
    name: "Golden Dragon",
    ref: "4",
    size: 28,
    description: "fire and blood",
    price: 50,
    category: ["kids"],
  },
  {
    name: "Pony Rainbow",
    ref: "5",
    size: 45,
    description: "glitter",
    price: 180,
    category: ["men"],
  },
];

(async function () {
  try {
    // cleaning the collection
    await Sneaker.deleteMany();
    // creating data
    const created = await Sneaker.create(sneakers);
    console.log(`Seed: ${created.length} sneakers inserted`);
    // kill of seed process (closing connection to db at the same time)
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit();
  }
})();
