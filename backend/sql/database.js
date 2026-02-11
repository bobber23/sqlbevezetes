const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'webshop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
async function categories() {
    const query = 'SELECT * FROM categories;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function insertinto(name) {
    const query = 'INSERT INTO categories(name) VALUES(?);';
    try {
        const [rows] = await pool.execute(query, [name]);
        return rows.insertId;
    } catch (error) {
        throw error;
    }
}

async function categoriesupdate(name, id) {
    const query = 'UPDATE categories SET categories.name = ? WHERE categories.id = ?;';
    try {
        const [rows] = await pool.execute(query, [name, id]);
        return rows.insertId;
    } catch (error) {
        throw error;
    }
}

//!Export
module.exports = {
    categories,
    insertinto,
    categoriesupdate
};
