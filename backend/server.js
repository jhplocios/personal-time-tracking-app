require('dotenv').config;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const DATABASE_URI = "mongodb+srv://ThinkingMachinesUser:thinkingmachines@personaltimetrackerapp-hod0s.gcp.mongodb.net/test?retryWrites=true&w=majority";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch(err => console.error("Connection error", err));

const userRouter = require('./routes/UserRoutes');
app.use('/user', userRouter);

const activityRouter = require('./routes/ActivityRoutes');
app.use('/activity', activityRouter);

app.listen(5000, () => console.log('server started'));