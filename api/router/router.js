const express = require("express")
const router = express.Router();
const{
    getQuestions,
    insertQuestion,
    getResult,
    storeResult}     = require('../controller/questionController');

router.route('/questions')
        .get(getQuestions)
        .post(insertQuestion); 

router.route('/result')
        .get(getResult)
        .post(storeResult)

module.exports = router;