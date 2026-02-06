const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const errorMiddleware = require("./middlewares/errorHandler.js");

const port = process.env.port || 3000;

main()
    .then(()=> {
        console.log("Connection succesful");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
}

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : true}));
app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname,"public")));

app.use(session({
    secret:"mySecretString",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000*60*60,
        expires: Date.now() + 1000*60*60
    }
}));

app.get("/" , (req,res) => {
    res.redirect("/listings");
})

const listingRoutes = require("./router/route.js");
app.use("/listings", listingRoutes);

const userRoutes = require("./router/userRoute.js");
app.use("/user", userRoutes);

// Catch all unknown routes
app.use((req, res, next) => {
    next({ status: 404, message: "Page not found" });
});

// Error handling middleware (must be at the end)
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});