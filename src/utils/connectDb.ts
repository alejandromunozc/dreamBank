import mongoose from 'mongoose';
import { config } from '../config/config';

const USER:String = encodeURIComponent(config.dbUser || '');
const PASSWORD:string = encodeURIComponent(config.dbPassword || '');
const DB_NAME:String = config.dbName || '';
const HOST:String = config.dbHost || '';

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`;
mongoose.set('useFindAndModify', false);
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected successfully to mongo');
}).catch(error => {
    console.log(error);
});