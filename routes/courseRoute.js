const express = require('express');
const route = express.Router();
const courseModel = require('../models/courseModel');
const { sendResponse } = require('../Helper/Helper');

route.get('/', async (req, res) => {

    const result = await courseModel.find();
    try {

        if (!result) {
            res.send(sendResponse(false, null, "no data found")).status(404)
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
    } catch (error) {
        res.send(sendResponse(false, null, "Internal server error")).status(400);
    }
})

route.get('/:id', async (req, res) => {
    res.send(sendResponse(false, null)).status(200)
});

route.post('/', async (req, res) => {
    const { cname, duration, fees, shortName } = req.body;
    try {
        let errArr = [];

        if (!cname) {
            errArr.push("Required : name");
        }
        if (!duration) {
            errArr.push("Required : duration");
        }
        if (!fees) {
            errArr.push("Required : fees");
        }
        if (!shortName) {
            errArr.push("Required : short name");
        }
        if (errArr.length > 0) {
            res
                .send(sendResponse(false, errArr, null, "Required All Fields"))
                .status(400);
            return;
        }
        else {
            const obj = { cname, duration, fees, shortName };
            const course = new courseModel(obj);

            if (!course) {
                res.send(sendResponse(false, null, "Internal server error")).status(400);
            } else {
                await course.save();
                res.send(sendResponse(true, course, "Saved successfully")).status(200);

            }
        }
    } catch (error) {
        res.send(sendResponse(false, null, "Internal Server Error", error)).send(400);
    }
})

module.exports = route;