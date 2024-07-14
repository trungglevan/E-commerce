import express from 'express';
import AuthController from '../app/controllers/AuthController.js';
import Auth from '../app/helpers/Auth.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/', AuthController.account);

export default router;
