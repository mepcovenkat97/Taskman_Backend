const config = require("config");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;

const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");

const JWT_SECRET = process.env.JWT_SECRET;
const { User } = require("../models/user")
passport.use(
   new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        secretOrKey: JWT_SECRET
      },
      async (payload, done) => {
        // payload contain user id
        try {
          const user = await User.findById(payload.sub)
          console.log(user)
          if (!user) {
            // 401 user not found
            return done(null, false);
          }
          done(null, user);
        } catch (err) {
          done(err, false);
        }
      }
    )
);

passport.use(
   new LocalStrategy(
     {
       usernameField: "email",
       passwordField: "password"
     },
     async (email, password, done) => {
       // finding user using email
       try {
         const user = await User.findOne({
           "email": email
         })
         if (!user || !(await user.isValidPassword(password))) {
           // user not found or invalid password
           return done(null, false);
         }
         if (user.method == "local" )
         done(null, user);
       } catch (err) {
         done(err, false);
       }
     }
   )
 );

exports.METHOD_LOCAL = "local";
exports.STRATEGY_JWT = "jwt";