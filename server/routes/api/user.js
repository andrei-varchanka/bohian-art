import express from 'express';
import passport from 'passport';
import * as userController from '../../controllers/user-controller.js';
import {validateUser} from "../../middleware/validation/user.js";


const router = express.Router();
router.use(express.json());

router.post('/auth',
    validateUser,
    userController.login
);

router
    .post('/', validateUser, userController.createUser)
    .get('/', userController.getAllUsers);

router.route('/:userId')
    .get(userController.getById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

export default router;
