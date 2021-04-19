const express = require("express");
const med_routes = express.Router();
const user_controller = require('../controller/user_controller');
const user_validation = require('../validation/user_validation')
const global_middleware = require('../global_middlewares/global_middleware')

function initilization() {
    // getRoutes();
    postRoutes();
}

initilization();

// function getRoutes() {
//     med_routes.get("/login", (req, res) => {
//         res.send("Welcome to cyber world");
//     });
// }

function postRoutes() {
    med_routes.post("/login", user_validation.user_login(), global_middleware.ractifyError, user_controller.userLogin);
    med_routes.post("/register", user_validation.user_register(), global_middleware.ractifyError, user_controller.userRegistration);
}

module.exports = med_routes;