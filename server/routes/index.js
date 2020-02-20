import express from 'express';
import user from "./api/user";

const router = express.Router();

router.use('/api/user', user);

export default router;
