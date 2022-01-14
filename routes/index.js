const express = require("express");
const { collection } = require("../models/Sneaker.js");
const router = express.Router();

require("../config/mongodb.js");
const Sneaker = require("../models/Sneaker.js")
const Tag = require("../models/Tag.js")


router.get("/", async(req, res, next) => {
try{
  const sneakers = await Sneaker.find()
  const tags = await Tag.find()
  res.render("products", {
    sneakers, tags,
    scripts : ["clientTagFilter"]

  })
}catch(e){
  next(e)
}});

router.get("/filterTag", async (req, res, next) => {
  try{ 
    console.log("req parmas :", req.params)

  }catch(e){
    next(e)
  }
})

router.get("/sneakers/:cat", (req, res, next) => {
  console.log("req parmas id :", req.params)
  let cat = req.params.cat;
  if(cat === "collection"){
    Sneaker.find()
    .then((sneakers)=>{
      res.render("products", {
        sneakers,
      })
    })
    .catch((e) => console.log(e));

  } else if (cat === "men") {
    Sneaker.find({category : "men"})
    .then((sneakersMen) =>{
      res.render("products", {
        sneakers : sneakersMen,
      })
    })
    .catch((e) => console.log(e))

  }else if (cat === "women") {
    Sneaker.find({category : "women"})
    .then((sneakersWomen) =>{
      res.render("products", {
        sneakers : sneakersWomen,
      })
    })
    .catch((e) => console.log(e))
}else if (cat === "kids") {
  Sneaker.find({category : "kids"})
  .then((sneakersKids) =>{
    res.render("products", {
      sneakers : sneakersKids,
    })
  })
  .catch((e) => console.log(e))

}else{
  req.flash("warning","Sorry this page doesn't exist")
}
})

router.get("/one-product/:id", (req, res, next) => {
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
