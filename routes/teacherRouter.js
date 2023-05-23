const express = require("express");
const route = express.Router();
const teacherModel = require('../models/teacherModel');
const { sendResponse } = require("../Helper/Helper");

route.get('/', async (req, res) => {
    // res.send("Get All Teacher Data");
    const result = await teacherModel.find();
    try {
        if (!result) {
            res.send(sendResponse(false, null, 'no data found')).status(404);
        } else {
            res.send(sendResponse(true, result)).status(200);
        }
    } catch (error) {
        res.send(sendResponse(false, null, 'internal server error')).status(400);
    }
});
route.get('/:id', (req, res) => {
    res.send("Get Teacher Data by Id ");
});
route.post('/', async (req, res) => {
    const { tname, course, contact } = req.body

    try {
        let errArr = [];

        if (!tname) {
            errArr.push("Required : Name");
        }
        if (!course) {
            errArr.push("Required : Course");
        }
        if (!contact) {
            errArr.push("Required : Contact");
        }
        if (errArr.length > 0) {
            res
                .send(sendResponse(false, errArr, null, "Required All Fields"))
                .status(400);
            return;
        }
        else {
            let obj = { tname, course, contact };
            let teacher = new teacherModel(obj);
            await teacher.save();
            if (!teacher) {
                res.send(sendResponse(false, null, "Internal server error")).status(400);
            } else {
                res.send(sendResponse(true, teacher, "Saved successfully")).status(200);

            }
        }
    } catch (err) {
        console.log(err);

        if (err.length > 0) {
            res.send(sendResponse(true, teacher, "Internal server error")).status(400);

        }
    }

});
route.put('/:id', (req, res) => {
    res.send("Update Teacher Data by Id ");

});
route.delete('/:id', (req, res) => {
    res.send("Delete Teacher Data ");

});


module.exports = route;