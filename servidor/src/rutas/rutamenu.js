import express from 'express';
import { menu, estadisticas } from '../controllers/contmenu.js';
import { ringresos } from './rutaingresos.js';
import { rtarifas } from './rutatarifas.js';
import { rbusca } from './rutabusca.js';
import { rsalidas } from './rutasalidas.js';
import { rclientes } from './rutaclientes.js';

const rmenu = express.Router();

rmenu.get('/', menu);
rmenu.post('/estadisticas', estadisticas);

rmenu.use(ringresos);
rmenu.use(rtarifas);
rmenu.use(rbusca);
rmenu.use(rsalidas);
rmenu.use(rclientes);

export { rmenu };