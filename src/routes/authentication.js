import express from 'express';
import AuthanticationController from '../controllers/authanticationController';

const router = express.Router();
router.post('/signup', AuthanticationController.register);
router.post('/login', AuthanticationController.Login);

export default router;
