import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import { config } from '../config/config';
import { findUser } from '../helpers/queries/userQuery';

const opts:StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
};

export default new Strategy(opts, async(payload, done) => {
  const user = await findUser(payload.identification);
  if(user){
    return done(null, user);
  }
  return done(null, false);
})