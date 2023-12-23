const mongoose = require('mongoose')

const resultModel = mongoose.Schema({
    result : {
        type:Array,
        default:[],
    },
    attempts : {
        type    : Array,
        default : []
    },
    points :{
        type : Number,
        default : 0
    },
    achived : {
        type:String,
        default:'',
    },
    createdAt :{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Result',resultModel)
