import express from 'express';
import { formingreso, nuevoingreso } from '../controllers/contingresos.js';

const ringresos = express.Router();
ringresos.get('/ingresos', formingreso);
ringresos.post('/ingresos', nuevoingreso);

export { ringresos };
