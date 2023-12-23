const  Questions = require("../models/questionModel.js");
const  Results = require("../models/resultModel.js");
const  {questions ,answers} = require('../data.js')

exports.getQuestions = async (req, res) => {
    try {
        const qus = await Questions.find();
        if(!qus.length > 0) throw new Error("Questions not found")
        res.status(200).json({
            "message": 'Get data successfully',
            qus
        })
    } catch (error) {
        res.json({
            "error": error.message
        })
    }
}

exports.insertQuestion = async (req,res) => {
    // const {questions,answers} = req.body
    try{
        await Questions.create({questions,answers})
        res.status(201).json({
            message : "Question added successfully",
        })
    } catch(error){
        res.json({
            error:error.message
        })
    }
}

exports.getResult = async (req, res) => {
    try {
        const result = await Results.find();
        res.status(200).json({
            result,
            "message": "Get Data Successfully"
        })
    } catch (error) {
        res.json({
            "error": error.message
        })
    }
}

exports.storeResult = async (req, res) => {
    try {
        const {result, points } = req.body;
        Results.create({ result, points }, function (err, data) {
            res.status(201).json({ 
                "message": "Result Saved Successfully...!" 
            })
        })
    } catch (error) {
        res.json({ 
            "error":error.message
         })
    }
}
