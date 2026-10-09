import mysql from 'mysql2/promise';

export async function conectar() {
    try {
        const bdd = await mysql.createPool({
            host: 'localhost',
            database: 'ESTACIONAMIENTO',
            user: 'root',
            password: 'Colito77'
        });
        console.log('conectado');
        return bdd;
    } catch (error) {
        console.log('no conectado');
    }
}