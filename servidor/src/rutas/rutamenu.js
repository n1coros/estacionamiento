import express from 'express';
import { menu } from '../controllers/contmenu.js';
import { ringresos } from './rutaingresos.js';

const rmenu = express.Router();

rmenu.get('/', menu);
rmenu.use(ringresos);

export { rmenu };
