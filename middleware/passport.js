const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const keys = require('../configs/keys');
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt.secret
};
module.exports = passport => {
try {
    passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
        const user = await User.findByPk(jwt_payload.id)
        if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }

    }));
}catch (e) {
    console.log(e)
}
};
