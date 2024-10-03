const mongoose = require('mongoose');
const addReportSchema = new mongoose.Schema({

    employeeFirstName:{
        type:String,
        required:true
    },
    employeeLastName:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    organizationName:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    contact:{
        type:Number,
        required:true
    },
    region:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    billAmount:{
        type:String,
        required:true
    },
    paidAmount:{
        type:String,
        required:true
    },
    unclearedAmount:{
        type:String,
        required:true
    },
    noOfProductSold:{
        type:String,
        required:true
    },
    billStatus:{
        type:[String],
        required:true
    },
})
const Report=mongoose.model('reports',addReportSchema);

module.exports = Report;