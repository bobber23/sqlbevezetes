const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');
const { request } = require('http');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//előzőfeladat
// //?GET /api/categories
// router.get('/categories', async (request, response) => {
//     try {
//         const categories = await database.categories();
//         response.status(200).json({
//             message: 'Ez a végpont működik.',
//             results: categories
//         });
//     } catch (error) {
//         response.status(500).json({
//             message: 'Ez a végpont nem működik.'
//         });
//     }
// });

// router.post('/categories', async (request, response) => {
//     const body = request.body;
//     try {
//         const insertinto = await database.insertinto(body.name);
//         response.status(200).json({
//             message: 'Ez a végpont működik.',
//             insertId: insertinto
//         });
//     } catch (error) {
//         response.status(500).json({
//             message: 'Ez a végpont nem működik.'
//         });
//     }
// });

// router.post('/updatecategories/:id', async (request, response) => {
//     try {
//         const updateCategories = await database.categoriesupdate(
//             request.body.name,
//             request.params.id
//         );
//         response.status(200).json({
//             message: 'Frissült az adatbázis.',
//             updateCategories: updateCategories
//         });
//     } catch (error) {
//         response.status(500).json({
//             message: 'Ez a végpont nem működik.'
//         });
//     }
// });

// router.post('/deletecategories/:id', async (request, response) => {
//     try {
//         const deleteCategories = await database.categoriesdelete(request.params.id);
//         response.status(200).json({
//             message: 'Törlődött a kategória.',
//             deleteCategories: deleteCategories
//         });
//     } catch (error) {
//         response.status(500).json({
//             message: 'Ez a végpont nem működik.'
//         });
//     }
// });

//?3.feladat
router.get('/diakok', async (request, response) => {
    try {
        const diakok = await database.diakok();
        response.status(200).json({
            diakok: diakok
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.get('/jegyek/:diakId', async (request, response) => {
    try {
        const diakId = request.params.diakId;
        const jegyek = await database.jegyek(diakId);
        response.status(200).json({
            jegyek: jegyek
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.post('/jegyek', async (request, response) => {
    try {
        const ujJegy = await database.ujJegy(
            request.body.diak_id,
            request.body.tanar_id,
            request.body.tantargy,
            request.body.jegy
        );
        response.status(200).json({
            message: 'Sikeresen feltöltötte az új jegyet.',
            ujJegy: ujJegy
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

module.exports = router;
