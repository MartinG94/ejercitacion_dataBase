var express = require('express');
var router = express.Router();
var actorsController = require('../controllers/actorsController');

/* GET home page. */
router.get('/', actorsController.listar);

module.exports = router;