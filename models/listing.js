const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description:String,
    image: {
    filename: { type: String, default: "listingimage" },
    url: {
        type: String,
        default: "https://images.unsplash.com/photo-1571896349842-33c89424de2d...",
        set: (v) => v === "" 
        ? "https://images.unsplash.com/photo-1571896349842-33c89424de2d..."
        : v
        }
    },
    price:Number,
    location:String,
    country:String
});

const listing = mongoose.model("listing",listingSchema);
module.exports = listing;             //this will export it as a mongoose model.. do not export it as an object {listing}.  