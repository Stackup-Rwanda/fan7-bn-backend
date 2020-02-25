import express from 'express';
import Controller from '../controllers/commentController';
import AuthMiddleware from '../middlewares/auth.middleware';
import CommentMiddlware from '../middlewares/comment.middleware';

const router = express.Router();

router.post('/:id/comment', CommentMiddlware.CommentValidate, AuthMiddleware.verifyToken, Controller.addComment);
router.get('/:id/comments', AuthMiddleware.verifyToken, Controller.getCommentsByRequest);
router.patch('/comment/:id', AuthMiddleware.verifyToken, Controller.updateComment);
router.delete('/comment/:id', AuthMiddleware.verifyToken, Controller.deleteComment);

export default router;
