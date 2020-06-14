import Painting from '../models/painting/painting.js';
import {PaintingResponse} from "../models/painting/painting-response.js";
import {BaseResponse} from "../models/base-response.js";
import {PaintingsResponse} from "../models/painting/paintings-response.js";


export const uploadPainting = async (request, response, next) => {
    const base64String = Buffer.from(request.file.buffer).toString('base64');
    const obj = {
        data: base64String,
        name: request.file.originalname,
        contentType: request.file.mimetype
    };
    const newPainting = await Painting.create(obj);
    response.send(new PaintingResponse(newPainting, true, null));

};

export const getPaintingById = (req, res, next) => {
    Painting.findOne({_id: req.params['paintingId']}, (err, painting) => {
        if (err) {
            next(err);
        } else {
            res.json(new PaintingResponse(painting, true, null));
        }
    });
};

export const deletePainting = (req, res, next) => {
    Painting.remove({_id: req.params['paintingId']}, (err, result) => {
        if (err) return console.log(err);
        res.json(new BaseResponse(true, null));
    });
};

export const getAllPaintings = (req, res, next) => {
    Painting.find((err, paintings) => {
        if (err) {
            next(err);
        } else {
            res.json(new PaintingsResponse(paintings, true, null));
        }
    });
};
