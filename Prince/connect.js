const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/e-comm").then(()=>{
    console.log("Db Connected");
}).catch((e)=>{
    console.log("Db connection error :"+e.message);
})