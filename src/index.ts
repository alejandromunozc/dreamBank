import express, {Request, Response} from 'express';
import cors from 'cors';
import passport from 'passport';
import passportMidle from './middlewares/passport';
import { config } from './config/config';
import userRoutes from './routes/user.routes';
import accountRoutes from './routes/account.routes';
import transactionRoutes from './routes/transaction.routes';
import './utils/connectDb';

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(userRoutes);
app.use(accountRoutes);
app.use(transactionRoutes);

passport.use(passportMidle);

app.get('/', (req:Request, res:Response) => {
  res.send('Welcome to Dream Bank API, please go to the repository on Github for documentation: https://github.com/alejandromunozc/dreamBank');
})

app.listen(config.port, () => {
  console.log(`listening http://localhost:${config.port}`);
});
