import express from 'express';
import passport from 'passport';
import multer from 'multer';
import * as paintingController from '../../controllers/painting-controller.js';


const router = express.Router();
router.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/',  upload.single('image'), paintingController.uploadPainting); // 'image' is formdata's field name

export default router;
