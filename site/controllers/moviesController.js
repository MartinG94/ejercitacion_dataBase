const db = require('../database/models/index');
const sequelize = db.sequelize;

const controller = {
    listar: (req, res) => {
        db.Peliculas.findAll()
            .then( (resultado) => {
                let peliculas = resultado;
                return res.render('movies', {
                    title: 'Peliculas',
                    peliculas: peliculas
                });
            })
            .catch( (error) => {
                return res.send('Ocurrió un error');
            });
    },
    getById: (req, res) => {
        const idPedido = req.params.id;
        db.Peliculas.findByPk(idPedido)
            .then( (pelicula) => {
                return res.render('movieDetail', {
                    title: 'Detail',
                    pelicula: pelicula
                });
            })
            .catch( (error) => {
                return res.send('Ocurrió un error');
            });
    },
    getByIdForEdit: (req, res) => {
        const idPedido = req.params.id;
        db.Peliculas.findByPk(idPedido)
            .then( (pelicula) => {
                return res.render('movieEdit', {
                    title: 'Detail',
                    pelicula: pelicula
                });
            })
            .catch( (error) => {
                return res.send('Ocurrió un error');
            });
    },
    actualizarPelicula: (req, res) => {
        const idPelicula = req.params.id;
        const body = req.body;
        /* Upsert crea el registro en caso de que no exista! */
        /* db.Peliculas.upsert({
            id: idPelicula,
            title: body.title,
            awards: body.awards,
            length: body.length,
            release_date: body.release_date
        }).then( () => {
            return res.redirect(`/movies/detail/${idPelicula}`);
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        }); */
        db.Peliculas.update({
            title: body.title,
            awards: body.awards,
            length: body.length,
            release_date: body.release_date
        },{
            where: {
                id: idPelicula
            }
        }).then( () => {
            return res.redirect(`/movies/detail/${idPelicula}`);
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        });
    },
    confirmarEliminacion: (req, res) => {
        const idPelicula = req.params.id;
        db.Peliculas.findByPk(idPelicula)
            .then( (pelicula) => {
                return res.render('deleteFormMovie', {
                    title: 'Eliminar Pelicula',
                    pelicula: pelicula
                })
            })
            .catch( (error) => {
                return res.send('Ocurrió un error');
            });
    },
    eliminarPelicula: (req, res) => {
        const idPelicula = req.params.id;
        db.Peliculas.findByPk(idPelicula)
            .then( (pelicula) => {
                return pelicula.destroy();
            })
            .then( () => {
                return res.redirect('/movies');
            })
            .catch( (error) => {
                return res.send('Ocurrió un error');
            });
    },
    lasMasNuevas: (req, res) => {
        db.Peliculas.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        }).then( (peliculas) => {
            return res.render('moviesNew', {
                title: 'Peliculas Recientes',
                peliculas: peliculas
            });
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        });
    },
    recomendadas: (req, res) => {
        db.Peliculas.findAll({
            where: {
                awards: {[db.Sequelize.Op.gte]: 5}
            }
        }).then( (peliculas) => {
            return res.render('moviesRecommended', {
                title: 'Recomendadas',
                peliculas: peliculas
            });
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        });
    },
    formularioBusqueda: (req, res) => {
        return res.render('searchMovies', {
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
            return res.render('resultSearchMovies',{
                title: 'Peliculas Encontradas',
                peliculas: peliculas
            });
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        });
    },
    formularioRegistroPelicula: (req, res) => {
        return res.render('addMovie', {
            title: 'Registrar Película'
        });
    },
    registrarPelicula: (req, res) => {
        const body = req.body;
        db.Peliculas.create({
            title: body.title,
            awards: body.awards,
            length: body.length,
            release_date: body.release_date
        })
        return res.redirect('/movies');
    }
};

module.exports = controller;