require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./routes/users/user.router");

app.use(express.json()); // to convert all the json to javascript object
app.use("/api/user", userRouter); // defined route for user

app.listen(process.env.APP_PORT, () => {
    console.log("Server up and running on PORT: ", process.env.APP_PORT);
});
