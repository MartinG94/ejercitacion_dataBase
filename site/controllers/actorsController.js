const db = require('../database/models/index');
const sequelize = db.sequelize;

const controller = {
    listar: (req, res) => {
        db.Actor.findAll()
            .then( (resultado) => {
                let actores = resultado;
                return res.render('actors', {
                    title: 'Actores',
                    actores: actores
                });
            })
            .catch( (error) => {
                return res.send('Ocurrió un error');
            });
    }
};

module.exports = controller;