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

export const fun01 = async (pet, resp) => {
    let x = pet.params.idpat;

    try {
        const bdd = await conectar();
        await bdd.query("DELETE FROM pagos WHERE ticketsregistros_idticketsregistros IN (SELECT idticketsregistros FROM ticketsregistros WHERE patente = '" + x + "');");
        await bdd.query("DELETE FROM ticketsregistros WHERE patente = '" + x + "';");
        resp.redirect('/busca');
    } catch (error) {
        console.log(error);
        resp.send('No se pudo borrar');
    }
}

export const fun02 = async (req, resp) => {
    const { patente, tipo, plaza } = req.body;

    try {
        const bdd = await conectar();
        let modificar = "UPDATE ticketsregistros SET tipo = '" + tipo + "', plaza = '" + plaza + "' WHERE patente = '" + patente + "' AND fsalida IS NULL;";
        await bdd.query(modificar);
        resp.redirect('/busca');
    } catch (error) {
        console.log(error);
        resp.send('No se pudo modificar');
    }
}