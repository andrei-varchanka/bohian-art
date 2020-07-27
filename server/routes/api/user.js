import express from 'express';
import passport from 'passport';
import * as userController from '../../controllers/user-controller.js';
import {validateCreateUser} from "../../middleware/validation/create-user.js";
import {checkIsInRole} from '../../middleware/roles.js'
import {ROLES} from "../../models/user/roles.js";
import {validateUpdateUser} from "../../middleware/validation/update-user.js";
import {validateChangePassword} from "../../middleware/validation/change-password.js";

const router = express.Router();
router.use(express.json());

router.post('/auth', userController.login);

router.post('/', validateCreateUser, userController.createUser);

router.get('/', passport.authenticate('jwt', {session: false}), checkIsInRole(ROLES.Admin), userController.getAllUsers);

router.route('/:userId').get(userController.getUserById);

router.route('/:userId').put(passport.authenticate('jwt', {session: false}), validateUpdateUser, checkIsInRole(ROLES.Admin, ROLES.Self), userController.updateUser);

router.route('/:userId/change-password').put(passport.authenticate('jwt', {session: false}), validateChangePassword, checkIsInRole(ROLES.Admin, ROLES.Self), userController.changePassword);

router.route('/:userId').delete(passport.authenticate('jwt', {session: false}), checkIsInRole(ROLES.Admin, ROLES.Self), userController.deleteUser);

export default router;
