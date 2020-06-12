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
    lasMasNuevas: (req, res) => {
        db.Peliculas.findAll({
            order: [
                ['release_date', 'DESC']
            ],
            limit: 5
        }).then( (peliculas) => {
            res.render('movieNew', {
                peliculas: peliculas
            });
        }).catch( (error) => {
            res.send('Ocurrió un error');
        })
    }
};

module.exports = controller;