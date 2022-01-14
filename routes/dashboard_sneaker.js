const { Router } = require("express");
const express = require("express"); // import express in this module
const { get } = require("express/lib/response");
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("./../models/Sneaker");
const User = require("./../models/User");
const Tag = require("./../models/Tag");
const uploader = require("./../config/cloudinary");
const path = require("path");

// this route is prefixed with dashboard

//  *** GET THE DASHBOARD LANDING PAGE ***

router.get("/", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find();
    console.log(sneakers);
    res.render("products_manage.hbs", {
      sneakers,
    });
  } catch (error) {
    next(error);
  }
});

// => get(/create) => le formulaire pour créer une nouvelle paire de sneakers
router.get("/create", async (req, res, next) => {
  try {
    const tags = await Tag.find();
    console.log(tags);
    res.render("products_add", {
      tags,
      scripts: ["client"],
    });
  } catch (error) {
    next(error);
  }
});

// => post(/create) => poster le formulaire pour créer une nouvelle paire dans la DB
router.post("/create", async (req, res, next) => {
  try {
    const newSneakers = { ...req.body };
    console.log(newSneakers);
    await Sneaker.create(newSneakers);
    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
});

// post(/create/tag) => pour ajouter de nouveaux tags dans la db
router.post("/create/tag", (req, res, next) => {
  Tag.create(req.body)
    .then((newTag) => res.status(201))
    .catch(next);
});

// => get(/delete/:id) => delete la paire de sneakers => redirect dashboard
router.get("/delete/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const deletedSneakers = await Sneaker.findByIdAndDelete(req.params.id);
    console.log(deletedSneakers);
    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
});

// => get(/update/:id) => affiche le formulaire
router.get("/edit/:id", async (req, res, next) => {
  try {
    const tags = await Tag.find();
    const sneaker = await Sneaker.findById(req.params.id);
    res.render("product_edit", {
      sneaker,
      tags,
    });
  } catch (error) {
    next(error);
  }
});

// => post(/update/:id) => poste le formulaire updaté
router.post("/edit/:id", uploader.single("image"), async (req, res, next) => {
  try {
    const editedSneakers = await Sneaker.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    console.log(editedSneakers);
    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
