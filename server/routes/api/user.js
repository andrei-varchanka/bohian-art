import express from 'express';
import passport from 'passport';
import * as userController from '../../controllers/user-controller.js';
import {validateLogin} from "../../middleware/validation/login";

const router = express.Router();
router.use(express.json());

router.post("/login",
    validateLogin,
    userController.login
);

export default router;
