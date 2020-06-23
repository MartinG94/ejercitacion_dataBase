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
    },
    getById: (req, res) => {
        const idPedido = req.params.id;
        db.Actor.findByPk(idPedido)
            .then( (actor) => {
                if(!actor){
                    return res.send(`No se encontró una actor con el id: ${idPedido}`);
                };
                return res.render('actorDetail', {
                    title: 'Detail',
                    actor: actor
                });
            })
            .catch( (error) => {
                return res.send('Ocurrió un error');
            })
    },
    getByIdForEdit: (req, res) => {
        const idPedido = req.params.id;
        db.Actor.findByPk(idPedido)
            .then( (actor) => {
                return res.render('actorEdit', {
                    title: 'Detail',
                    actor: actor
                });
            })
            .catch( (error) => {
                return res.send('Ocurrió un error');
            });
    },
    actualizarActor: (req, res) => {
        const idActor = req.params.id;
        const body = req.body;
        db.Actor.update({
            first_name: body.first_name,
            last_name: body.last_name,
            rating: body.rating,
            favorite_movie_id: body.favorite_movie_id
        },{
            where: {
                id: idActor
            }
        }).then( () => {
            return res.redirect(`/actors/detail/${idActor}`);
        }).catch( (error) => {
            return res.send('Ocurrió un error');
        });
    },

};

module.exports = controller;