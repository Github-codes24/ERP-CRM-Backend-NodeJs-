import express from 'express';

import { setCompany } from '../controllers/posts.js';
const router = express.Router();
router.post('/', setCompany);
export default router;