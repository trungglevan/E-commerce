import express from 'express';
import SiteController from '../app/controllers/SiteController.js';
import Auth from '../app/helpers/Auth.js';
import AuthController from '../app/controllers/AuthController.js';

const router = express.Router();

router.get('/register', SiteController.register);
router.get('/login', SiteController.login);
router.use('/logout', AuthController.logOut);
router.get('/admin', SiteController.admin);
router.get('/about', SiteController.about);
router.get('/', SiteController.home);

export default router;
