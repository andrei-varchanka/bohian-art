import express from 'express';
import passport from 'passport';
import * as userController from '../../controllers/user-controller.js';
import {validateUser} from "../../middleware/validation/user.js";


const router = express.Router();
router.use(express.json());

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

router.post('/auth',
    validateUser,
    userController.login
);

/**
 * @swagger
 * path:
 *  /:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: A user schema
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 */
router
    .post('/', validateUser, userController.createUser)
    .get('/', userController.getAllUsers);

router.route('/:userId')
    .get(userController.getById)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

export default router;
