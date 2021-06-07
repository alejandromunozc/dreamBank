import express from 'express';
const app = express();
import cors from 'cors';
import { config } from './config/config';
import passport from 'passport';
import passportMidle from './middlewares/passport';

import './connectDb'

import userRoutes from './routes/user.routes'
import accountRoutes from './routes/account.routes'

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

passport.use(passportMidle);

app.listen(config.port, function() {
  console.log(`listening http://localhost:${config.port}`);
});

app.use(userRoutes);
app.use(accountRoutes);