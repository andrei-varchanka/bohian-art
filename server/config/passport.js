import passport from 'passport';
import passportJwt from 'passport-jwt';
import configAuth from './auth.js';
import User from '../models/user.js';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: configAuth.JWT.secret,
};

passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
        try {
            // User.findOne({email: jwt_payload.email, password: jwt_payload.password})
            const user = await User.findById(jwtPayload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            done(error, false);
        }
    })
);

export default passport;
