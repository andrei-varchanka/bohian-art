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
 *      parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/User'
 *      responses:
 *        "200":
 *          description: OK
 *          schema:
 *            $ref: '#/definitions/AuthUserResponse'
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
 *      parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/User'
 *      responses:
 *        "200":
 *          description: OK
 *          schema:
 *            $ref: '#/definitions/UserResponse'
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
 *      - bearerAuth: []
 *      responses:
 *        "200":
 *          description: OK
 *          schema:
 *            $ref: '#/definitions/UsersResponse'
 *        "401":
 *          description: Unauthorized
 */
router.get('/', passport.authenticate('jwt', { session: false }), userController.getAllUsers);


/**
 * @swagger
 * path:
 *  /users/{userId}:
 *    get:
 *      summary: Get the user by id
 *      tags: [Users]
 *      security:
 *      - bearerAuth: []
 *      parameters:
 *      - name: userId
 *        in: path
 *        required: true
 *        type: string
 *      responses:
 *        "200":
 *          description: OK
 *          schema:
 *            $ref: '#/definitions/UserResponse'
 *        "401":
 *          description: Unauthorized
 */
router.route('/:userId').get(passport.authenticate('jwt', { session: false }), userController.getById);

/**
 * @swagger
 * path:
 *  /users/{userId}:
 *    put:
 *      summary: Update the user
 *      tags: [Users]
 *      security:
 *      - bearerAuth: []
 *      parameters:
 *      - name: userId
 *        in: path
 *        required: true
 *        type: string
 *      - name: body
 *        in: body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/User'
 *      responses:
 *        "200":
 *          description: OK
 *          schema:
 *            $ref: '#/definitions/UserResponse'
 *        "401":
 *          description: Unauthorized
 */
router.route('/:userId').put(passport.authenticate('jwt', { session: false }), userController.updateUser);

/**
 * @swagger
 * path:
 *  /users/{userId}:
 *    delete:
 *      summary: Delete the user
 *      tags: [Users]
 *      security:
 *      - bearerAuth: []
 *      parameters:
 *      - name: userId
 *        in: path
 *        required: true
 *        type: string
 *      responses:
 *        "200":
 *          description: OK
 *          schema:
 *            $ref: '#/definitions/BaseResponse'
 *        "401":
 *          description: Unauthorized
 */
router.route('/:userId').delete(passport.authenticate('jwt', { session: false }), userController.deleteUser);

export default router;
