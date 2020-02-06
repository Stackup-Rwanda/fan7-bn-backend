import express from 'express';
import Controller from '../controllers/commentController';
import AuthMiddleware from '../middlewares/auth.middleware';
import Validation from '../middlewares/comment.middleware';


const router = express.Router();

router.post('/:id/comment', Validation.CommentValidate, AuthMiddleware.verifyToken, Controller.addComment);
router.get('/:id/comments', AuthMiddleware.verifyToken, Controller.getCommentsByRequest);
router.delete('/comment/:id', AuthMiddleware.isCommentOwner, AuthMiddleware.verifyToken, Controller.deleteComment);

export default router;
