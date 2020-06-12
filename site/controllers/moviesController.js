const db = require('../database/models/index');
const sequelize = db.sequelize;

const controller = {
    listar: (req, res) => {
        db.Peliculas.findAll()
            .then( (resultado) => {
                let peliculas = resultado;
                res.render('movies', {
                    peliculas: peliculas
                });
            })
            .catch( (error) => {
                res.send('Ocurrió un error');
            });
    },
    getById: (req, res) => {
        const idPedido = req.params.id;
        db.Peliculas.findByPk(idPedido)
            .then( (pelicula) => {
                res.render('movieDetail', {
                    pelicula: pelicula
                });
            })
            .catch( (error) => {
                res.send('Ocurrió un error');
            })
    },
    actualizarPelicula: (req, res) => {

    },
    eliminarPelicula: (req, res) => {

    },
    lasMasNuevas: (req, res) => {
        db.Peliculas.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        }).then( (peliculas) => {
            res.render('moviesNew', {
                peliculas: peliculas
            });
        }).catch( (error) => {
            res.send('Ocurrió un error');
        })
    },
    recomendadas: (req, res) => {
        db.Peliculas.findAll({
            where: {
                awards: {[db.Sequelize.Op.gte]: 5}
            }
        }).then( (peliculas) => {
            res.render('moviesRecommended', {
                peliculas: peliculas
            });
        }).catch( (error) => {
            res.send('Ocurrió un error');
        })
    },
    formularioBusqueda: (req, res) => {
        res.render('searchMovies');
    },
    buscar: (req, res) => {
        const busqueda = req.body.buscar;
        db.Peliculas.findAll({
            where:{
                title: {[db.Sequelize.Op.like]: `%${busqueda}%`}
            }
        }).then( (peliculas) => {
            res.render('movies',{
                peliculas: peliculas
            });
        }).catch( (error) => {
            res.send('Ocurrió un error');
        })
    }
};

module.exports = controller;