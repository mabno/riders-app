import { Router } from 'express';
import {Register, Login } from './controllers';
const router = Router();


router.post('/api/register', Register);
router.post('/api/login', Login);

export default router;