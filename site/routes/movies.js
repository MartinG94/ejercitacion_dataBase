var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

/* GET home page. */
router.get('/', moviesController.listar);

router.get('/detail/:id', moviesController.getById);

router.get('/edit/:id', moviesController.getByIdForEdit);
router.post('/edit/:id', moviesController.actualizarPelicula);

router.get('/delete/:id', moviesController.confirmarEliminacion);
router.delete('/delete/:id', moviesController.eliminarPelicula);

router.get('/new', moviesController.lasMasNuevas);

router.get('/recommended', moviesController.recomendadas);

router.get('/search', moviesController.formularioBusqueda);
router.post('/search', moviesController.buscar);

router.get('/create', moviesController.formularioRegistroPelicula);
router.post('/create', moviesController.registrarPelicula);

module.exports = router;