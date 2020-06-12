module.exports = (sequelize, dataTypes) => {
    const alias = 'Actores';
    const columnas = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        },
        rating: {
            type: dataTypes.FLOAT
        },
        favorite_movie_id: {
            type: dataTypes.INTEGER
        }
    };
    const configuracion = {
        tableName: 'actors', /* Nombre de la Tabla */
        timestamps: false
    };

    const Actor = sequelize.define(alias, columnas, configuracion);
    return Actor;
};