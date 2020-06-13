const db = require('../database/models/index');
const sequelize = db.sequelize;

const controller = {
    listar: (req, res) => {
        db.Peliculas.findAll()
            .then( (resultado) => {
                let peliculas = resultado;
                res.render('movies', {
                    title: 'Peliculas',
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
                    title: 'Detail',
                    pelicula: pelicula
                });
            })
            .catch( (error) => {
                res.send('Ocurrió un error');
            })
    },
    getByIdForEdit: (req, res) => {
        const idPedido = req.params.id;
        db.Peliculas.findByPk(idPedido)
            .then( (pelicula) => {
                res.render('movieEdit', {
                    title: 'Detail',
                    pelicula: pelicula
                });
            })
            .catch( (error) => {
                res.send('Ocurrió un error');
            })
    },
    actualizarPelicula: (req, res) => {
        const idPelicula = req.params.id;
        const body = req.body;
        db.Peliculas.upsert({
            id: idPelicula,
            title: body.title,
            awards: body.awards,
            length: body.length
        }).then( () => {
            res.redirect(`/movies/detail/${idPelicula}`);
        }).catch( (error) => {
            res.send('Ocurrió un error');
        });
    },
    confirmarEliminacion: (req, res) => {
        const idPelicula = req.params.id;
        db.Peliculas.findByPk(idPelicula)
            .then( (pelicula) => {
                res.render('deleteFormMovie', {
                    title: 'Eliminar Pelicula',
                    pelicula: pelicula
                })
            })
            .catch( (error) => {
                res.send('Ocurrió un error');
            });
    },
    eliminarPelicula: (req, res) => {
        const idPelicula = req.params.id;
        db.Peliculas.findByPk(idPelicula)
            .then( (pelicula) => {
                pelicula.destroy();
                res.send('Pelicula eliminada de la Base de Datos');
            })
            .catch( (error) => {
                res.send('Ocurrió un error');
            })
    },
    lasMasNuevas: (req, res) => {
        db.Peliculas.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        }).then( (peliculas) => {
            res.render('moviesNew', {
                title: 'Peliculas Recientes',
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
                title: 'Recomendadas',
                peliculas: peliculas
            });
        }).catch( (error) => {
            res.send('Ocurrió un error');
        })
    },
    formularioBusqueda: (req, res) => {
        res.render('searchMovies', {
            title: 'Buscador'
        });
    },
    buscar: (req, res) => {
        const busqueda = req.body.buscar;
        db.Peliculas.findAll({
            where:{
                title: {[db.Sequelize.Op.like]: `%${busqueda}%`}
            }
        }).then( (peliculas) => {
            if(peliculas.length == 0) {
                return res.send('No se encontraron resultados para su busqueda');
            };
            res.render('resultSearchMovies',{
                title: 'Peliculas Encontradas',
                peliculas: peliculas
            });
        }).catch( (error) => {
            res.send('Ocurrió un error');
        })
    }
};

module.exports = controller;