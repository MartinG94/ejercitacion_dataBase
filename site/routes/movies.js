var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

/* GET home page. */
router.get('/', moviesController.listar);

// router.get('/add', moviesController.formularioNuevaPelicula);
// router.put('/add', moviesController.publicarPelicula);

router.get('/detail/:id', moviesController.getById);

router.get('/detail/:id/editar', moviesController.getByIdForEdit);
router.put('/detail/:id/editar', moviesController.actualizarPelicula);

router.get('/detail/:id/eliminar', moviesController.confirmarEliminacion);
router.delete('/detail/:id/eliminar', moviesController.eliminarPelicula);

router.get('/new', moviesController.lasMasNuevas);

router.get('/recommended', moviesController.recomendadas);

router.get('/search', moviesController.formularioBusqueda);
router.post('/search', moviesController.buscar);

module.exports = router;