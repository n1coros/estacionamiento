import express from 'express';
import { busca, formbusca, fun01, fun02 } from '../controllers/contbusca.js';

const rbusca = express.Router();
rbusca.get('/busca', busca);
rbusca.post('/busca', formbusca);

/*
rbusca.get('algunaruta/:idpat', fun01) // esto va a buscar la funcion fun01 que tiene el delete o modificar*/
rbusca.get('/borrar/:idpat', fun01);

rbusca.post('/modificar', fun02);

export { rbusca };