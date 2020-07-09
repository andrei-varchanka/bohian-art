import Painting from '../models/painting/painting.js';
import {PaintingResponse} from "../models/painting/painting-response.js";
import {BaseResponse} from "../models/base-response.js";
import {PaintingsResponse} from "../models/painting/paintings-response.js";


export const uploadPainting = async (request, response, next) => {
    const base64String = Buffer.from(request.file.buffer).toString('base64');
    const image = {
        data: base64String,
        name: request.file.originalname,
        contentType: request.file.mimetype
    };
    const painting = {
        image: image,
        name: request.body.name,
        author: request.body.author,
        userId: request.body.userId,
        genres: request.body.genres,
        height: request.body.height,
        width: request.body.width,
        price: request.body.price,
        description: request.body.description
    };
    const newPainting = await Painting.create(painting);
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

export const getAllPaintings = async (req, res, next) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit;
    var filterObj = {};
    if (req.query.userId) {
        filterObj.userId = req.query.userId;
    }
    if (req.query.price_from) {
        filterObj.price = filterObj.price || {};
        filterObj.price.$gte = +req.query.price_from;
    }
    if (req.query.price_to) {
        filterObj.price = filterObj.price || {};
        filterObj.price.$lte = +req.query.price_to;
    }
    if (req.query.width_from) {
        filterObj.width = filterObj.width || {};
        filterObj.width.$gte = +req.query.width_from;
    }
    if (req.query.width_to) {
        filterObj.width = filterObj.width || {};
        filterObj.width.$lte = +req.query.width_to;
    }
    if (req.query.height_from) {
        filterObj.height = filterObj.height || {};
        filterObj.height.$gte = +req.query.height_from;
    }
    if (req.query.height_to) {
        filterObj.height = filterObj.height || {};
        filterObj.height.$lte = +req.query.height_to;
    }
    if (req.query.genres) {
        filterObj.genres = filterObj.genres || {};
        filterObj.genres.$in = req.query.genres.toString().split(',');
    }
    
    try {
        const paintings = await Painting.find(filterObj).limit(limit).skip((page - 1) * limit).exec();
        const count = await Painting.countDocuments(filterObj);
        const totalPages = limit ? Math.ceil(count / limit) : null;
        res.json(new PaintingsResponse(paintings, totalPages, page, true, null));
    } catch (err) {
        next(err);
    }
};
