import { conectar } from '../database/conexion.js';

export const verSalidas = (pet, resp) => {
    resp.render('salidas');
}

export const salida = async (pet, resp) => {
    let     patente = pet.body.patente;
        let metodo = pet.body.metodo;

    try {
    const bdd = await conectar();

    const [tickets] = await bdd.query("SELECT *, TIMESTAMPDIFF(MINUTE, CONCAT(fecha, ' ', fentrada), NOW()) AS minutos FROM ticketsregistros WHERE patente = '" + patente + "' AND fsalida IS NULL;");
    if (tickets.length === 0) {
     return resp.send('No hay un vehículo activo con esa patente');
}
        let t = tickets[0];

    const [tarifa] = await bdd.query("SELECT preciohora FROM tipo_vehiculos WHERE nombre = '" + t.tipo + "';");
        let precio = tarifa[0].preciohora;

        let horas = Math.ceil(t.minutos / 60);
    if (horas < 1) {
        horas = 1;
}
        let monto = horas * precio;

    await bdd.query("UPDATE ticketsregistros SET fsalida = CURTIME(), horas = " + horas + ", total = " + monto + " WHERE idticketsregistros = " + t.idticketsregistros + ";");
await bdd.query("INSERT INTO pagos (monto, metodopago, ticketsregistros_idticketsregistros) VALUES (" + monto + ", '" + metodo + "', " + t.idticketsregistros + ");");
    await bdd.query("UPDATE plazas SET estado = 'Disponible' WHERE codigo = '" + t.plaza + "';");

        resp.render('comprobante', { patente: patente, tipo: t.tipo, plaza: t.plaza, horas: horas, monto: monto, metodo: metodo });
    } catch (error) {
        console.log(error);
        resp.send('No se pudo registrar la salida');
    }
}