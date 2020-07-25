import passport from 'passport';
import passportJwt from 'passport-jwt';
import User from '../models/user/user.js';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};

passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
        return User.findOne({email: jwt_payload.email, password: jwt_payload.password})
            .then(user => {
                if (!user) {
                    return done(null, false);
                } else {
                    return done(null, user)
                }
            })
            .catch(err => console.log(err));
    })
);

export default passport;
