const express = require("express");
const { sendResponse } = require("../Helper/Helper");
const route = express.Router();
const InstModel = require('../models/instituteModel')

route.get('/', async (req, res) => {
    // res.send("Get All Institute Data");

    const result = await InstModel.find();
    try {
        if (!result) {
            res.send(sendResponse(false, null, "institute name is required"));
        } else {
            res.send(sendResponse(true, result)).status(200)
        }
    } catch (err) {
        res.send(sendResponse(400, null, err.message, err))
    }

});
route.get('/:id',  (req, res) => {
    res.send("Get Institute Data by Id ");
});
route.post('/', async(req, res) => {

    const { instName, address, shortName, tel } = req.body

    try {
        let errArr = [];

        if (!instName) {
            errArr.push("Required : Name");
        }
        if (!address) {
            errArr.push("Required : Address");
        }
        if (!shortName) {
            errArr.push("Required : Short Name");
        }
        if (!tel) {
            errArr.push("Required : tel");
        }
        if (errArr.length > 0) {
            res
                .send(sendResponse(false, errArr, null, "Required All Fields"))
                .status(400);
            return;
        }
        else {
            let obj = { instName, address, shortName,tel };
            let institute = new InstModel(obj);
            await institute.save();
            if (!institute) {
                res.send(sendResponse(false, null, "Internal server error")).status(400);
            } else {
                res.send(sendResponse(true, institute, "Saved successfully")).status(200);

            }
        }
    } catch (err) {
        console.log(err);

        if (err.length > 0) {
            res.send(sendResponse(true, institute, "Internal server error")).status(400);

        }
    }

});
route.put('/:id', (req, res) => {
    res.send("Update Institute Data by Id ");

});
route.delete('/:id', (req, res) => {
    res.send("Delete Institute Data ");

});


module.exports = route;