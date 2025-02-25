const { model, Schema } = require("mongoose");

const sneakerSchema = new Schema ({
    name: String,
    ref: String,
    size: [ Number ],
    description: String,
    price: Number,
    image: {
        type: String,
        default: "/medias/img/shoe.png"
    },
    category: {
        type : [ String ], 
        enum : ["men", "women", "kids"]
        // un Ibject.Id ici...?
    },
    id_tags: {
        type : [ Schema.Types.ObjectId ],
        ref : "tags"
    }
})

const Sneaker = model("sneakers", sneakerSchema);

module.exports = Sneaker;
