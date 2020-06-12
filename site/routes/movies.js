var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

/* GET home page. */
router.get('/', moviesController.listar);

module.exports = router;