const express = require("express");
const port = process.env.PORT;
require('./db/db')

const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const userRouter = require('./routes/UserRoutes');
app.use('/user', userRouter);

const activityRouter = require('./routes/ActivityRoutes');
app.use('/activity', activityRouter);

app.listen(port, () => console.log(`Server running on port ${port}`));