const express = require('express');
const path = require('path');
const fs = require('fs');
const app = require('../../app');
const autoLoadController = require('../libs/autoLoadController');

const router = express.Router()
const loader = new autoLoadController()

router.get("/", (req, res) => {
    var module = process.env.DEFAULT_MODULE || "index"
    var controller = process.env.DEFAULT_CONTROLLER || "index"
    var action = "index"
    loader.callController(module, controller, action, req, res)
})

router.get("/:module", (req, res) => {
    var module = req.params.module
    var controller = process.env.DEFAULT_CONTROLLER || "index"
    var action = "index"
    loader.callController(module, controller, action, req, res)
})

router.get("/:module/:controller", (req, res) => {
    var module = req.params.module
    var controller = req.params.controller
    var action = "index"
    loader.callController(module, controller, action, req, res)
})

router.get("/:module/:controller/:action", (req, res) => {
    var module = req.params.module
    var controller = req.params.controller
    var action = req.params.action
    loader.callController(module, controller, action, req, res)
})

router.get("/:module/:controller/:action/:parameter", (req, res) => {
    var module = req.params.module
    var controller = req.params.controller
    var action = req.params.action
    var params = req.params.parameter
    loader.callController(module, controller, action, req, res)
})

module.exports = router