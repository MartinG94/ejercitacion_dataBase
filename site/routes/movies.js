var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

/* GET home page. */
router.get('/', moviesController.listar);
router.get('/detail/:id', moviesController.getById);
module.exports = router;