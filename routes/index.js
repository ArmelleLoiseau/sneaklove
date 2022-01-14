const express = require("express");
const router = express.Router();

require("../config/mongodb.js");
const Sneaker = require("../models/Sneaker.js")


router.get("/", (req, res, next) => {
  Sneaker.find()
  .then((sneakers) => {
    console.log("All senakers : ", sneakers);
    res.render("products", {
      sneakers,
    })
  })
  .catch((e) => console.log(e));
});

router.get("/sneakers/:cat", (req, res) => {
  // const catSneacker = Sneaker.find(Sneaker.category)
  // if (catSneacker = kids)
  // .then((catSneacker) =>{
  //   console.log("cat of sneackers :", catSneacker);
  //   res.render("sneakers_cat", {

  //   })
  // })
});

router.get("/one-product/:id", (req, res) => {
  Sneaker.findById(req.params.id)
  .then((sneaker) =>{
    console.log(sneaker);
    res.render("one_product", {
      sneaker : sneaker,
    })
  })
  .catch((e) => console.error(e))
});

// router.get("/signup", (req, res) => {
//   res.send("sneak");
// });

// router.get("/signin", (req, res) => {
//   res.send("love");
// });

module.exports = router;
