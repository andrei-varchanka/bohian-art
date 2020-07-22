import express from 'express';
import passport from 'passport';
import multer from 'multer';
import * as paintingController from '../../controllers/painting-controller.js';

const router = express.Router();
router.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), paintingController.uploadPainting); // 'image' is formdata's field name

router.get('/', paintingController.getAllPaintings);

router.get('/parameters', paintingController.getParameters);

router.route('/:paintingId').get(paintingController.getPaintingById);

router.route('/:paintingId').put(passport.authenticate('jwt', {session: false}), upload.single('image'), paintingController.updatePainting);

router.route('/:paintingId').delete(passport.authenticate('jwt', {session: false}), paintingController.deletePainting);


export default router;
