const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

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

//?GET /api/categories
router.get('/categories', async (request, response) => {
    try {
        const categories = await database.categories();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: categories
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.post('/categories', async (request, response) => {
    const body = request.body;
    try {
        const insertinto = await database.insertinto(body.name);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            insertId: insertinto
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.post('/updatecategories/:id', async (request, response) => {
    const itemId = request.params.id;
    try {
        // const insertinto = await database.insertinto(body.name);
        response.status(200).json({
            message: 'Ez a végpont működik.',
            itemId: itemId
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

// router.get('/avgar', async (request, response) => {
//     try {
//         const avgar = await database.avgprice();
//         response.status(200).json({
//             message: 'Ez a végpont működik.',
//             avgAr: Object.values(avgar[0])[0]
//         });
//     } catch (error) {
//         response.status(500).json({
//             message: 'Ez a végpont nem működik.'
//         });
//     }
// });

module.exports = router;
