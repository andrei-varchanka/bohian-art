import {BaseResponse} from "../models/base-response.js";
import {ROLES} from "../models/user/roles.js";
import Painting from "../models/painting/painting.js";

export const checkIsInRole = (...roles) => async (req, res, next) => {
    if (roles.find(role => req.user.toJSON().role === role)) {
        return next();
    }
    if (roles.indexOf(ROLES.Self) !== -1 && req.params.userId === req.user.toJSON().id) {
        if (req.method === 'PUT' && req.route.path === '/:userId' &&  req.body.role !== req.user.toJSON().role) {
            return res.status(403).send(new BaseResponse(null, 'Forbidden'));
        } else {
            return next();
        }
    }
    if (roles.indexOf(ROLES.Self) !== -1 && req.params.paintingId) {
        const painting = await Painting.findOne({_id: req.params.paintingId});
        if (painting && painting.userId === req.user.toJSON().id) {
            return next();
        }
    }
    return res.status(403).send(new BaseResponse(null, 'Forbidden'));
};
