import Painting from '../models/painting/painting.js';
import {PaintingResponse} from "../models/painting/painting-response.js";


export const uploadPainting = async (request, response, next) => {
    const obj = {
        data: request.file.buffer,
        name: request.file.originalname,
        contentType: request.file.mimetype
    };
    const newPainting = await Painting.create(obj);
    response.send(new PaintingResponse(newPainting, true, null));

};