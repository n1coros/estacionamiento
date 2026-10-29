import { conectar } from '../database/conexion.js';

export const menu = (pet, resp) => {
    resp.render('menu', { stats: [], desde: '', hasta: '' });
}

export const estadisticas = async (pet, resp) => {
    let desde = pet.body.desde;
    let hasta = pet.body.hasta;

    try {
        const bdd = await conectar();
        const [filas] = await bdd.query("SELECT tipo, SUM(total) AS dinero FROM ticketsregistros WHERE fsalida IS NOT NULL AND fecha BETWEEN '" + desde + "' AND '" + hasta + "' GROUP BY tipo;");
        resp.render('menu', { stats: filas, desde: desde, hasta: hasta });
    } catch (error) {
        console.log(error);
        resp.send('No se pudo calcular');
    }
}