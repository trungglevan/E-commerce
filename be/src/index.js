import express from 'express';
import { engine } from 'express-handlebars';
import route from './route/index.route.js';
import cookieParser from 'cookie-parser';
import Cors from 'cors'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(Cors());

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/resources/views');

route(app);

app.listen(3320)
