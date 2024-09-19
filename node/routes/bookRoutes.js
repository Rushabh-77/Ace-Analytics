const express = require('express');
const { getBooks, getBookById } = require('../contollers/bookController');
const router = express.Router();

router.get('/getAll', getBooks);
router.get('/getById/:id', getBookById);

module.exports = router;
