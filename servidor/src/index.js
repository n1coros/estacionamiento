import express from 'express';
import colors from 'colors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const puerto = 3000;

app.set('view engine', 'ejs');

const directorio = path.dirname(fileURLToPath(import.meta.url));
app.set('views', path.join(directorio, 'vistas'));

app.use(express.static(path.join(directorio, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

import { rmenu } from './rutas/rutamenu.js';
app.use(rmenu);

app.listen(puerto, () => {
    console.log(`servidor iniciando ${puerto}`.blue);
});
