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

module.exports= {setCompany,getFinancialdata,getCalenderdata};