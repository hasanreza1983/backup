'use strict';
const Sequelize = require('sequelize');
const config = require('../config').database;
const fs = require('fs');
const path = require('path');
const dbConnection = new Sequelize(
    config.name,
    config.username,
    config.password,
    config.options
);
const db = {};

fs.readdirSync(__dirname)
    .filter(function (file) {
        console.log(file)
        return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function (file) {
        let model;
        model = dbConnection['import'](path.join(__dirname, file));
        db[model.name] = model;
        //db[model.name].sync({ force: false });
    });

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

dbConnection
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully to the Database.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the Database:', err);
    });

db.dbConnection = dbConnection;
db.Sequelize = Sequelize;

module.exports = db;