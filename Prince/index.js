require('./connect');

const express = require('express');
const Product = require('./model/productModel');
const Customer = require('./model/customerModel');
const Lead = require('./model/leadModel')


const app =express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/getTopProducts',async(req,res)=>{

  const topProducts = await  Product.find({}).sort({
    projects:-1,
    popularity:-1
  }).limit(5);

  res.status(200).json(topProducts);
})


app.get('/getTopCustomer',async(req,res)=>{

  const topCustomer = await Customer.find({}).sort({
    customerSince : -1
  }).limit(5);

  res.status(200).json(topCustomer);
})

app.get('/earningPerProduct',async(req,res)=>{

  const products = await Product.find({});

  const earningPerProduct = products.map((product)=>{

    const earnings = product.price * (product.salesPercentage / 100);
    return{
      name: product.name,
      earnings: earnings,
    }
  })

  res.status(200).json(earningPerProduct);


  
})

app.post('/addLead',async(req,res)=>{

  const leadData = req.body;
  const lead =new Lead(leadData);
   const datasave = await lead.save(); 

  res.status(200).json(datasave);

})

app.get('/getLeads',async(req,res)=>{
  
  const data= await Lead.find({}).select('organizationName lastMeeting nextFollowUp targetDepartment leadOwner');

  res.status(200).json(data);
})

app.get('/trackLead/:id',async(req,res)=>{

  const id = req.params.id;
  const result = await Lead.findById({_id:id}).select('organizationName lastMeeting nextFollowUp status salesExpected category');
  res.status(200).json(result);

})

app.listen(3000,()=>{
  console.log("connected");
});