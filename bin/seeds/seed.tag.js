require('dotenv').config();
require('../../config/mongodb');
const Tag = require('../../models/Tag');

const tags = [
  { label: "Sport" },
  { label: "Gangsta" },
  { label: "Urban" },
  { label: "Soccer" },
  { label: "School" },
  { label: "Fashion" },
];

(async function() {
  try {
    // cleaning the collection
    await Tag.deleteMany();
    // creating data
    const created = await Tag.create(tags);
    console.log(`Seed: ${created.length} tags inserted`)
    // kill of seed process (closing connection to db at the same time)
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit();
  }
})();