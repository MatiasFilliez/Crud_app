const path = require('path');
const { Sequelize } = require('sequelize');
const { DB_NAME, DB_PASSWORD, DB_USER, HOST } = process.env

//definimos los parametros de conexion
const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD, {
    host: HOST,
    dialect: 'mysql'
})

// Requiero los archivos de la carpeta Models
const models = [
    require(path.join(__dirname, '/models/product', "index.js")),
    require(path.join(__dirname, '/models/tags', "index.js"))
]

// Injecto la conexion (sequelize) a todos los modelos
models.forEach((model) => model(sequelize))

// Capitalizo los nombres de los modelos : product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Tags, Product } = sequelize.models;

// Aca vendrian las relaciones
Product.hasMany(Tags)
Tags.belongsTo(Product)

module.exports = {
    ...sequelize.models,
    conn: sequelize
};
