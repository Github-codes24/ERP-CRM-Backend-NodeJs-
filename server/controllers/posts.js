import express from 'express';
import Company from '../models/company.js';
import Finance from '../models/finance.js'

const router = express.Router();

export const setCompany = async (req, res) => {
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

export const getFinancialdata=async(req,res)=>{
    const { date} = req.body;
    try {
        const entries = await Finance.findOne({ date })
        res.status(200).json(entries);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

export default router;