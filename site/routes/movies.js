var express = require('express');
var router = express.Router();
var moviesController = require('../controllers/moviesController');

/* GET home page. */
router.get('/', moviesController.listar);
router.get('/detail/:id', moviesController.getById);

/* TO DO
router.put('/detail/:id', moviesController.actualizarPelicula);
router.delete('/detail/:id', moviesController.eliminarPelicula);
*/

router.get('/new', moviesController.lasMasNuevas);

router.get('/recommended', moviesController.recomendadas);

router.get('/search', moviesController.formularioBusqueda);
router.post('/search', moviesController.buscar);

module.exports = router;