import express from 'express';
import Company from '../models/company.js';

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

export default router;