import express from 'express';
import { menu } from '../controllers/contmenu.js';
import { ringresos } from './rutaingresos.js';
import { rtarifas } from './rutatarifas.js';
import { rbusca } from './rutabusca.js';
import { rsalidas } from './rutasalidas.js';  

const rmenu = express.Router();

rmenu.get('/', menu);

rmenu.use(ringresos);
rmenu.use(rtarifas);
rmenu.use(rbusca);
rmenu.use(rsalidas);   

export { rmenu };