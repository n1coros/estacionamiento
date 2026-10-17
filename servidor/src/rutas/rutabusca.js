import express from 'express';
import { busca, formbusca } from '../controllers/contbusca.js';

const rbusca = express.Router();
rbusca.get('/busca', busca);
rbusca.post('/busca', formbusca);

export { rbusca };