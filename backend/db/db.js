const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => {
    console.error("Connection error", err.message);
    process.exit(1);
  });