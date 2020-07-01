import express from 'express';
import passport from 'passport';
import * as userController from '../../controllers/user-controller.js';
import {validateUser} from "../../middleware/validation/create-user.js";


const router = express.Router();
router.use(express.json());

router.post('/auth', userController.login);

router.post('/', validateUser, userController.createUser);

router.get('/', passport.authenticate('jwt', {session: false}), userController.getAllUsers);

router.route('/:userId').get(userController.getUserById);

router.route('/:userId').put(passport.authenticate('jwt', {session: false}), userController.updateUser);

router.route('/:userId/change-password').put(passport.authenticate('jwt', {session: false}), userController.changePassword);

router.route('/:userId').delete(passport.authenticate('jwt', {session: false}), userController.deleteUser);

export default router;
