const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'iskola',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
//előzőfeladat
// async function categories() {
//     const query = 'SELECT * FROM categories;';
//     const [rows] = await pool.execute(query);
//     return rows;
// }

// async function insertinto(name) {
//     const query = 'INSERT INTO categories(name) VALUES(?);';
//     try {
//         const [rows] = await pool.execute(query, [name]);
//         return rows.insertId;
//     } catch (error) {
//         throw error;
//     }
// }

// async function categoriesupdate(name, id) {
//     const query = 'UPDATE categories SET categories.name = ? WHERE categories.id = ?;';
//     try {
//         const [rows] = await pool.execute(query, [name, id]);
//         return rows.updateCategories;
//     } catch (error) {
//         throw error;
//     }
// }

// async function categoriesdelete(id) {
//     const query = 'DELETE FROM categories WHERE categories.id = ?;';
//     try {
//         const [rows] = await pool.execute(query, [id]);
//         return rows.deleteCategories;
//     } catch (error) {
//         throw error;
//     }
// }

async function diakok() {
    const query = 'SELECT nev, osztaly FROM diak;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function jegyek(id) {
    const query =
        'SELECT jegy.tantargy, jegy.jegy, (SELECT tanar.nev FROM tanar WHERE tanar.id = jegy.tanar_id), jegy.datum FROM jegy WHERE jegy.diak_id = ?';
    try {
        const [rows] = await pool.execute(query, [id]);
        return rows;
    } catch (error) {
        throw error;
    }
}

//!Export
module.exports = {
    //előzőfeladat
    // categories,
    // insertinto,
    // categoriesupdate,
    // categoriesdelete
    diakok,
    jegyek
};
