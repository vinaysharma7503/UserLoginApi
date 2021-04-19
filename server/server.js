const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const med_routes = require('../routers/user_routes');
const mongoose = require('mongoose');
const environ = require('../environment/env');

function initilization() {
    setUpDatabase();
    setupBodyParser();
    setUpRoutes();
    setupError404Handler();
    setupErrorHandler();
}

initilization();

function setupBodyParser() {
    app.use(bodyParser.urlencoded({ extended: true })); //in methods always use colons
    app.use(bodyParser.json());
}

function setUpDatabase() {
    let env = environ.environ();
    mongoose.connect(env.db_root, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
        .then((r) => {
            console.log("Database connected Successfully on ", env.db_root);
        }).catch((err) => {
            console.log(err);
        });
}

function setUpRoutes() {
    app.use('/user', med_routes);
}

function setupError404Handler() {
    app.use((req, res) => {
        res.status(404).json({
            msg: 'NOT FOUND',
            status: 404
        });
    });
}

function setupErrorHandler() {
    app.use((err, req, res, next) => {
        res.status(500).json({
            msg: err.message || "Something went wrong. Please try again later",
            status: 500
        });
    });
}
module.exports = app;