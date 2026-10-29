import express from 'express';
import { verclientes, guardarcliente, borrarcliente, buscarcliente } from '../controllers/contclientes.js';

const rclientes = express.Router();

rclientes.get('/clientes', verclientes);
rclientes.post('/clientes', guardarcliente);
rclientes.get('/borrarcliente/:idcli', borrarcliente);
rclientes.post('/buscarcliente', buscarcliente);

export { rclientes };