import * as passport from 'passport';
import * as BearerStrategy from 'passport-http-bearer';
import { ValidToken } from '../utils/security/tokens';
import DB from '../db';

passport.use(new BearerStrategy.Strategy(async (token, done) => {
    try {
        let payload: any = await ValidToken(token);
        console.log(payload);
        let [user] = await DB.authors.findOneById(payload.authorid);
        if(user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (error) {
        console.log
        done(error);
    }
}))