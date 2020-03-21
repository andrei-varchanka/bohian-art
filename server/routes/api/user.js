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

/**
 * @swagger
 * path:
 *  /users/auth:
 *    post:
 *      summary: Authorize user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/User'
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/AuthUserResponse'
 *        "401":
 *          description: Invalid credentials
 */
router.post('/auth',
    validateUser,
    userController.login
);

/**
 * @swagger
 * path:
 *  /users:
 *    post:
 *      summary: Create a new user
 *      tags: [Users]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/definitions/User'
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/UserResponse'
 *        "400":
 *          description: Such user have already created
 */
router.post('/', validateUser, userController.createUser);

/**
 * @swagger
 * path:
 *  /users:
 *    get:
 *      summary: Get all users
 *      tags: [Users]
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/definitions/UsersResponse'
 *        "401":
 *          description: Unauthorized
 */
router.get('/', passport.authenticate('jwt', { session: false }), userController.getAllUsers);

router.route('/:userId').get(passport.authenticate('jwt', { session: false }), userController.getById);
router.route('/:userId').put(passport.authenticate('jwt', { session: false }), userController.updateUser);
router.route('/:userId').delete(passport.authenticate('jwt', { session: false }), userController.deleteUser);

export default router;
