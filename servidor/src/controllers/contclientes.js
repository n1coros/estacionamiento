import { conectar } from '../database/conexion.js';

export const verclientes = (pet, resp) => {
    resp.render('clientes', { registrado: [], buscado: [] });
}

export const guardarcliente = async (pet, resp) => {
    let nombre = pet.body.nombre;
    let telefono = pet.body.telefono;
    let patente = pet.body.patente;
    let estado = pet.body.estado;

    try {
        const bdd = await conectar();
        await bdd.query("INSERT INTO clientes (nombre, telefono, patente, estadosuscripcion) VALUES ('" + nombre + "', '" + telefono + "', '" + patente + "', '" + estado + "');");
        const [filas] = await bdd.query("SELECT * FROM clientes WHERE patente = '" + patente + "';");
        resp.render('clientes', { registrado: filas, buscado: [] });
    } catch (error) {
        console.log(error);
        resp.send('No se pudo guardar');
    }
}

export const buscarcliente = async (pet, resp) => {
    let patente = pet.body.patente;

    try {
        const bdd = await conectar();
        const [filas] = await bdd.query("SELECT * FROM clientes WHERE patente = '" + patente + "';");
        resp.render('clientes', { registrado: [], buscado: filas });
    } catch (error) {
        console.log(error);
        resp.send('No se pudo buscar');
    }
}

export const borrarcliente = async (pet, resp) => {
    let x = pet.params.idcli;

    try {
        const bdd = await conectar();
        await bdd.query("DELETE FROM clientes WHERE idclientes = " + x + ";");
        resp.redirect('/clientes');
    } catch (error) {
        console.log(error);
        resp.send('No se pudo borrar');
    }
}