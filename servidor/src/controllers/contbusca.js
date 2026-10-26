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


/*export const fun01 = (pet, resp)=>{
 // vas a poner la sentencia delete dentro de un trycatch
 let x = pet.params.idpat;

 console.log(x);
 try {
    let borrar = "DELETE FROM ticketsregistros WHERE patente = '"+ x +"';";

 } catch (error) {
    
 }
}
*/
export const fun01 = async (pet, resp) => {
    let x = pet.params.idpat;

    try {
        const bdd = await conectar();
        let borrar = "DELETE FROM ticketsregistros WHERE patente = '"+ x +"';";
        await bdd.query(borrar);
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
        let modificar = "UPDATE ticketsregistros SET tipo = '" + tipo + "', plaza = '" + plaza + "' WHERE patente = '" + patente + "';";
        await bdd.query(modificar);
        resp.redirect('/busca');
    } catch (error) {
        console.log(error);
        resp.send('No se pudo modificar');
    }
}