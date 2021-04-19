const Mongoose = require("mongoose");
const bcrypt = require('bcryptjs');


const user_Data = new Mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already Exists."],
    },
    phone: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        unique: [true, "Phone Number Already Exists."],
        required: true,
        default: ""
    },
    username: {
        type: String,
        unique: [true, 'Username already Exists'],
        required: true,
        default: ""
    },
    password: {
        type: String,
        minlength: 8,
        maxlength: 100,
        default: ""
    },
    created_on: {
        type: Date
    },
    updated_on: {
        type: Date
    },
    auth_r_token: {
        type: String
    },
    auth_l_token: {
        type: String
    }

});

user_Data.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        console.log(this.password);
    }
})

module.exports = Mongoose.model('user', user_Data);