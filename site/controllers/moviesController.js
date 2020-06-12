const db = require('../database/models/index');
const sequelize = db.sequelize;

const controller = {
    listar: (req, res) => {
        db.Peliculas.findAll()
            .then( (resultado) => {
                let peliculas = resultado[0];
                res.render('movies', {
                    peliculas: peliculas
                });
            })
            .catch( (error) => {
                res.send('Ocurrió un error');
            });
    }
};

module.exports = controller;