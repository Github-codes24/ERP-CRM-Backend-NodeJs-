import express from 'express';

import { setCompany,getFinancialdata,getCalenderdata} from '../controllers/posts.js';
const router = express.Router();
router.post('/', setCompany);
router.get('/', getFinancialdata);
router.get('/', getCalenderdata);




export default router;