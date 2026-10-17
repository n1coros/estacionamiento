import { conectar } from '../database/conexion.js';

export function busca(req, resp) {
    resp.render('busca', { busca: [] });
}

export async function formbusca(req, resp) {
    const { patente } = req.body;
    const bdd = await conectar();

    const [filas] = await bdd.query(
        `SELECT t.patente, t.tipo, t.plaza, p.estado, t.fentrada
         FROM ticketsregistros t
         JOIN plazas p ON p.codigo = t.plaza
         WHERE t.patente = ?`,
        [patente]
    );

    resp.render('busca', { busca: filas });
}