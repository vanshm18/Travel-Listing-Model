const express = require('express');
const app = express();
const router = express.Router();

const methodOverride = require("method-override");
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true}));

const listingSchema = require("../schemas/listingSchema.js");

const Listing = require("../models/listing.js");

const validateListing = (req,res,next) => {                          // validation middleware
    let { error } = listingSchema.validate(req.body);
    if (error) {
        return next({
            status: 400,
            message: error.details[0].message,
            extra: error.details
        });
    }
    next();
}

router.get("/", async (req,res) => {
    const listings = await Listing.find({});
    res.render("listings.ejs" , {data : listings});
});

router.get("/login" , (req,res) => {
    res.render("login.ejs");
});

router.get("/register" , (req,res) => {
    res.render("register.ejs");
});

router.get("/new",(req,res) => {
    res.render("newListing.ejs");
});

router.post("/new", validateListing, (req,res) => {                        //validateListing -> calling validation middleware
    let {title,image,description,price,location,country} = req.body;
    let newListing = new Listing({
        title,
        image: {
            url: image,  // 👈 form value goes to `url`
            filename: "listingimage" // or any default
        },
        description,
        price,
        location,
        country
    });

    newListing.save()
    .then((result) => {
        res.redirect("/listings");
    })
    .catch((err) => {
        console.log(err);
    });
});

router.get("/:id", async (req,res) => {
    let {id} = req.params;
    const showListing = await Listing.findById(id);
    res.render("showListing.ejs",{post : showListing});
});

router.get("/:id/edit",async (req,res) => {
    let {id} = req.params;
    let edit = await Listing.findById(id);
    res.render("edit.ejs" , {edit});
});

router.put("/:id", validateListing, async (req,res) => {
    let {id} = req.params;
    let {
        title: newTitle,
        image: newImage,
        description: newDescription,
        price: newPrice,
        location: newLocation,
        country: newCountry
    } = req.body;
    let update = await Listing.findByIdAndUpdate(id, {
    title: newTitle,
    description: newDescription,
    price: newPrice,
    location: newLocation,
    country: newCountry,
    image: {
        filename: "listingimage",   // or from req.body if you allow
        url: newImage
    }
});
    res.redirect("/listings");
});

router.delete("/:id", async (req,res) => {
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

module.exports = router;