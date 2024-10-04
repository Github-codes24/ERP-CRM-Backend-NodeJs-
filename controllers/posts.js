const  Company =  require('../models/company.js');
const  Finance =  require('../models/finance.js');
const Sale = require('../models/saleModel.js');

const setCompany = async (req, res) => {
    const { companyName } = req.body; 
    try {
        let company = await Company.findOne({ companyName });
        
        if (!company) {
            company = new Company(req.body); 
            await company.save();
        }
        
        res.status(200).json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
};

const getFinancialdata=async(req,res)=>{
    const { date} = req.body;
    try {
        const entries = await Finance.findOne({ date })
        res.status(200).json(entries);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
const getCalenderdata=async(req,res)=>{
    const { date} = req.body;
    try {
        const entries = await Sale.findOne({ date })
        res.status(200).json(entries);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
const addSalesReport=async(req,res)=>{
  const{organizationName}=req.body;
  try {
    let salesReport = await Sale.findOne({ organizationName }); 
    if (!salesReport) {
      salesReport = new Sale(req.body);
      await salesReport.save();
    
    res.status(200).json(salesReport);
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' }); 
}
}


const getSalesReport = async (req,res)=>{
  try {
    const salesReport = await Sale.find(); 
    
    return res.status(200).json(salesReport);
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' }); 
}
}

const getTotalbill=async(req,res)=>{
    try {
      const salesdata = await Sale.find();
      const totalBill = salesdata.reduce((acc, sale) => {
        return acc + parseFloat(sale.billAmount) || 0;
    }, 0);

    res.status(200).json({ message: `Total bill is: ${totalBill}` });

} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' }); 
}

}
const getClearedbill=async(req,res)=>{
  try {
    const salesdata = await Sale.find();
    const clearedBill = salesdata.reduce((acc, sale) => {
      return acc + parseFloat(sale.paidAmount) || 0;
  }, 0);

  res.status(200).json({ message: `Total cleared bill is: ${clearedBill}` });

} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' }); 
}

}
const getPendingbill=async(req,res)=>{
  try {
    const salesdata = await Sale.find();
    const pendingBill = salesdata.reduce((acc, sale) => {
      return acc + parseFloat(sale.unclearedAmount) || 0;
  }, 0);

  res.status(200).json({ message: `Total Pending bill is: ${pendingBill}` });

} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Internal server error' }); 
}

}

module.exports= {setCompany,getFinancialdata,getCalenderdata,addSalesReport, getSalesReport, getTotalbill, getClearedbill,getPendingbill};