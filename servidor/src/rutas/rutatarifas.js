import express from 'express';
import { tarifas } from '../controllers/conttarifas.js';

const rtarifas = express.Router();
rtarifas.get('/tarifas', tarifas);

export { rtarifas };