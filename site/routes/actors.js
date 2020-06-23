var express = require('express');
var router = express.Router();
var actorsController = require('../controllers/actorsController');

/* GET home page. */
router.get('/', actorsController.listar);

router.get('/detail/:id', actorsController.getById);

router.get('/edit/:id', actorsController.getByIdForEdit);
// router.post('/edit/:id', actorsController.actualizarActor);

module.exports = router;