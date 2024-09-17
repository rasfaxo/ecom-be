import express from 'express';
import { createUsers} from '../controllers/Users/createUsers.js';
import { loginUsers } from '../controllers/Users/loginUsers.js';
import { logoutUsers } from '../controllers/Users/logoutUsers.js';
const router = express.Router();

router.route('/').post(createUsers);
router.post('/auth', loginUsers);
router.post('/logout', logoutUsers);


export default router;