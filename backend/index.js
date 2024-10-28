const express = require("express");
const mainRouter = require("./routes/index");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",mainRouter);
app.use(cors());


app.listen(3000,() => {
    console.log("server is listening on port no 3000");
})
