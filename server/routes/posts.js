import express from 'express';

import { setCompany,getFinancialdata} from '../controllers/posts.js';
const router = express.Router();
router.post('/', setCompany);
router.get('/', getFinancialdata);




export default router;