module.exports = (sequelize, dataTypes) => {
    const alias = 'Peliculas';
    const columnas = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        awards: {
            type: dataTypes.INTEGER
        },
        length: {
            type: dataTypes.INTEGER
        },
        release_dat: {
            type: dataTypes.STRING
        },
        genre_id: {
            type: dataTypes.INTEGER
        }
    };
    const configuracion = {
        tableName: 'movies', /* Nombre de la Tabla */
        timestamps: false
    };

    const Pelicula = sequelize.define(alias, columnas, configuracion);
    return Pelicula;
};