import express from 'express';
import Controller from '../controllers/feedbackController';
import AuthMiddleware from '../middlewares/auth.middleware';
import Validation from '../middlewares/feedback.middleware';


const router = express.Router();

router.post('/:id/feedback', AuthMiddleware.verifyToken, Validation.FeedbackValidate, Controller.addFeedback);

export default router;
