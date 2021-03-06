const db = require('../database/models/index');
const sequelize = db.sequelize;
const moment = require('moment');

const controller = {
    listar: (req, res) => {
        db.Pelicula.findAll()
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
        db.Pelicula.findByPk(idPedido)
            .then( (pelicula) => {
                if(!pelicula){
                    return res.send(`No se encontró una pelicula con el id: ${idPedido}`);
                };
                pelicula.release_date_formatted = moment(pelicula.release_date).format('DD/MM/YYYY');
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
        db.Pelicula.findByPk(idPedido)
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
        db.Pelicula.update({
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
        db.Pelicula.findByPk(idPelicula)
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
        db.Pelicula.destroy({
            where: {
                id: idPelicula
            }
        }).then( () => {
            return res.redirect('/movies');
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        })
    },
    lasMasNuevas: (req, res) => {
        db.Pelicula.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        }).then( (peliculas) => {
            peliculas.forEach( pelicula => {
                pelicula.release_date_formatted = moment(pelicula.release_date).format('DD/MM/YYYY');
            });
            return res.render('moviesNew', {
                title: 'Peliculas Recientes',
                peliculas: peliculas
            });
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        });
    },
    recomendadas: (req, res) => {
        db.Pelicula.findAll({
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
        db.Pelicula.findAll({
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
        db.Pelicula.create({
            title: body.title,
            awards: body.awards,
            length: body.length,
            release_date: body.release_date
        }).then( () => {
            return res.redirect('/movies');
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        })
    }
};

module.exports = controller;