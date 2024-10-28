const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/paytmBasic");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
})

const User = mongoose.model("User",userSchema);

module.exports = {
    User,
}