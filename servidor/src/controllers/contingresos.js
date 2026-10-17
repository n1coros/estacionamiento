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
    const bdd = await conectar();

    await bdd.query(
        "INSERT INTO ticketsregistros (fecha, fentrada, patente, tipo, plaza) VALUES (CURDATE(), CURTIME(), ?, ?, ?)",
        [patente, tipo, plaza]
    );

    await bdd.query("UPDATE plazas SET estado = ? WHERE codigo = ?", [estado, plaza]);

    resp.redirect('/ingresos');
}