const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");

mongoose.connect("mongodb://127.0.0.1:27017/my_notes")
.then(()=>{
    console.log("Connected to MongoDB Database my_notes");
})
.catch(err=>{
    console.log("Database Connection Error:", err);
});

const initDB = async () => {
    try {
        await Listing.deleteMany({});
        console.log("Existing listings cleared.");

        await Listing.insertMany(data.data);
        console.log("Sample listings inserted successfully");

    } catch (err) {
        console.error("Error initializing database:", err);
    }
};

initDB();