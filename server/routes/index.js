import express from 'express';
import user from "./api/user.js";
import painting from "./api/painting.js";


const router = express.Router();

router.use('/paintings', painting);
router.use('/users', user);

export default router;
