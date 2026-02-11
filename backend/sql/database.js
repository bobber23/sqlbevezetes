const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'suloskaja',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
async function selectall() {
    const query = 'SELECT * FROM kaja;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function insertinto(nev, ar, finom) {
    const query = 'INSERT INTO kaja(nev, ar, finom) VALUES(?, ?, ?);';
    try {
        const [rows] = await pool.execute(query, [nev, ar, finom]);
        return rows.insertId;
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new Error(`Az étel neve vagy finomsága már létezik az adatdázisban!`);
        }
        throw error;
    }
}

async function avgprice() {
    const query = 'SELECT AVG(kaja.ar) FROM kaja;';
    try {
        const [rows] = await pool.execute(query);
        return rows;
    } catch (error) {
        throw error;
    }
}

//!Export
module.exports = {
    selectall,
    insertinto,
    avgprice
};
