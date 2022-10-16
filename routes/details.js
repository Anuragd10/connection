import express from 'express';
import pool from '../data/pgdb.js';

import {getDetails} from '../controllers/details.js';

const router = express.Router();

router.get('/', getDetails);

export default router;