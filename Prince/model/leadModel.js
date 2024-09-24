const mongoose = require('mongoose');


const leadSchema = new mongoose.Schema({

    organizationName:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
     },
    area:{
        type:String,
        required:true
    },
    productPromoted:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    leadGenratedThrough:{
        type:[String],
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },callObjective:{
        type:String,
        required:true
    },
    nextCallObjective:{
        type:String,
        required:true
    },
    targetDepartment:{
        type:String,
        required:true
    },
    discussionPoint:{
        type:String,
        required:true
    },
    lastMeeting:{
        type:Date,
        required:true
    },
    nextFollowUp:{
        type:Date,
        required:true
    },
     requiredSupport:{
        type:String,
        required:true
    },
     comments:{
        type:String,
        required:true
    },
     salesExpected:{
        type:Date, 
       
        required:true
        
    },
    
    status:{
        type:String,
        required:true
    },
    leadOwner:{
        type:String,
        required:true
    },
    category:{
        type:[String],
        required:true
    }
});

const lead=mongoose.model('lead',leadSchema);

module.exports = lead;