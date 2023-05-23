const express = require("express");
const route = express.Router();
const StdModel = require('../models/studentModel');
const { sendResponse } = require("../Helper/Helper")


route.get('/', async (req, res) => {
    // res.send("Get All student Data");
    const result = await StdModel.find();

    try {
        if (!result) {
            res.send(sendResponse(false, null, "no data found")).status(404);
        } else {
            res.send(sendResponse(true, result)).status(200);
        }
    } catch (e) {
        console.log(e);
        res.send(sendResponse).status(400)
    }

});
route.get('/:id', async (req, res) => {

    const id = req.params.id;
    const result = await StdModel.findById(id);
    if (result) {
        res.send(sendResponse(true, result)).status(200)
    } else {
        res.send("error")
    }

});
route.post('/', async (req, res) => {
    // res.send("Post student Data ");
    const { fname, lname, contact, email, password } = req.body
    try {
        let errArr = [];

        if (!fname) {
            errArr.push("Required : First Name");
        }
        if (!lname) {
            errArr.push("Required : Last Name");
        }
        if (!contact) {
            errArr.push("Required : Contact");
        }
        if (!email) {
            errArr.push("Required : Email");
        }
        if (!password) {
            errArr.push("Required : Password");
        }

        if (errArr.length > 0) {
            res
                .send(sendResponse(false, errArr, null, "Required All Fields"))
                .status(400);
            return;
        }
        else {
            let obj = { fname, lname, contact, email, password };
            let student = new StdModel(obj);
            await student.save();
            if (!student) {
                res.send(sendResponse(false, null, "Internal server error")).status(400);
            } else {
                res.send(sendResponse(true, student, "Saved successfully")).status(200);

            }
        }
    } catch (err) {
        console.log(err);

        if (err.length > 0) {
            res.send(sendResponse(true, student, "Internal server error")).status(400);

        }
    }

});
route.put('/:id', (req, res) => {
    // res.send("Update student Data by Id ");

    // console.log(req.params);


});
route.delete('/:id', (req, res) => {
    res.send("Delete student Data ");

});


module.exports = route;