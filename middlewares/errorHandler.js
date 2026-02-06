// Handles all errors in one place instead of scattering try/catch everywhere.1

const errorMiddleware = (err,req,res,next) => {
    const status = err.status || 500;                                                   //500 default if no status is passed
    const message = err.message || "Something went wrong!";                            //something went erong is default if no message is passed
    // const extra = err.extraDetails || "Something doesnt seem right";

    res.status(status).send(message);               //or .render(ejs page);
}

module.exports = errorMiddleware;

// err.status → is a property you can set on your error when you throw or next() it.
// err.message → is the human-readable explanation of the error.

// err.extraDetails → is just an optional custom field you can pass if you want to provide more info about the error (like debugging details, which route failed, etc.).
// Example:

// next({
//     status: 403,
//     message: "Unauthorized access",
//     extraDetails: "You must be logged in to delete a listing"
// });