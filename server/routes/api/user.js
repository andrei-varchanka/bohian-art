import express from 'express';
import passport from 'passport';
import * as userController from '../../controllers/user-controller.js';
import {validateUser} from "../../middleware/validation/create-user.js";
import {checkIsInRole} from '../../middleware/roles.js'
import {ROLES} from "../../models/user/roles.js";

const router = express.Router();
router.use(express.json());

router.post('/auth', userController.login);

router.post('/', validateUser, userController.createUser);

router.get('/', passport.authenticate('jwt', {session: false}), checkIsInRole(ROLES.Admin), userController.getAllUsers);

router.route('/:userId').get(userController.getUserById);

router.route('/:userId').put(passport.authenticate('jwt', {session: false}), checkIsInRole(ROLES.Admin, ROLES.Self), userController.updateUser);

router.route('/:userId/change-password').put(passport.authenticate('jwt', {session: false}), checkIsInRole(ROLES.Admin, ROLES.Self), userController.changePassword);

router.route('/:userId').delete(passport.authenticate('jwt', {session: false}), checkIsInRole(ROLES.Admin, ROLES.Self), userController.deleteUser);

export default router;
