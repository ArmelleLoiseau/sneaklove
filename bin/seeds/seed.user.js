require('dotenv').config();
require('../../config/mongodb');
const User = require('../../models/User');

const users = [
  { name: "Mirabelle", lastname: "Foo", email: "mirabelle@foo.com", password: "1234" },
  { name: "Bar", lastname: 'Baz', email: "bar@baz.com", password: "1234" },
];

(async function() {
  try {
    // cleaning the collection
    await User.deleteMany();
    // creating data
    const created = await User.create(users);
    console.log(`Seed: ${created.length} users inserted`)
    // kill of seed process (closing connection to db at the same time)
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit();
  }
})();