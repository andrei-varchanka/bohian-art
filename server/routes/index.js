import express from 'express';
import user from "./api/user.js";

const router = express.Router();

router.use('/api/users', user);

export default router;
