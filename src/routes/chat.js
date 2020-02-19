import express from 'express';
import path from 'path';
import ChatController from '../controllers/ChatController';
import AuthMiddleware from '../middlewares/auth.middleware';
import connector from '../middlewares/connector';

const router = express.Router();

router.use(express.static(path.join(`${__dirname}/../../public`)));
router.get('/', AuthMiddleware.verifyToken, connector, (req, res) => {
  res.sendFile(path.join(`${__dirname}/../../public/chat.html`));
});

router.get('/get', ChatController.getMessages);
router.post('/post', ChatController.saveMessage);


export default router;
