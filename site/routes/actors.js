var express = require('express');
var router = express.Router();
var actorsController = require('../controllers/actorsController');

/* GET home page. */
router.get('/', actorsController.listar);

router.get('/detail/:id', actorsController.getById);

module.exports = router;