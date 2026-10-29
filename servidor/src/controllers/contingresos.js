import { conectar } from '../database/conexion.js'

export const formingreso = async (req, resp) => {
    const bdd = await conectar();
    const [ingresos] = await bdd.query(`
        SELECT t.patente, t.tipo, t.plaza, t.fentrada, p.estado
        FROM ticketsregistros t
        JOIN plazas p ON p.codigo = t.plaza
        WHERE t.fecha = CURDATE()
    `);
    resp.render('ingresos', { ingresos });
}

export const nuevoingreso = async (req, resp) => {
    const { patente, tipo, plaza, estado } = req.body;

    try {
        const bdd = await conectar();

        let insertar = "INSERT INTO ticketsregistros (fecha, fentrada, patente, tipo, plaza) VALUES (CURDATE(), CURTIME(), '" + patente + "', '" + tipo + "', '" + plaza + "');";
        await bdd.query(insertar);

        let actualizar = "UPDATE plazas SET estado = '" + estado + "' WHERE codigo = '" + plaza + "';";
        await bdd.query(actualizar);

        resp.redirect('/ingresos');
    } catch (error) {
        console.log(error);
        resp.send('No se pudo registrar el ingreso');
    }
}