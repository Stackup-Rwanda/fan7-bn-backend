import passport from 'passport';
import Google from 'passport-google-oauth';
import Facebook from 'passport-facebook';

const GoogleStrategy = Google.OAuth2Strategy;
const FacebookStrategy = Facebook.Strategy;

passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/api/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => done(null, profile)));

passport.use('facebook', new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/api/auth/facebook/callback',
}, async (accessToken, refreshToken, profile, done) => done(null, profile)));
