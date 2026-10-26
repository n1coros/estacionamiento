import express from 'express';
import { verSalidas, salida } from '../controllers/contsalidas.js';

const rsalidas = express.Router();

rsalidas.get('/salidas', verSalidas);
rsalidas.post('/salidas', salida);

export { rsalidas };