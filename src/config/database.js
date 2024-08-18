const { Sequelize } = require('sequelize');
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('../utils/secrets');
const { logger } = require('../utils/logger');


const database = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: (msg) => logger.info(msg), 
});


database.authenticate()
    .then(() => {
        logger.info('Database Successfully Connected');
    })
    .catch((err) => {
        logger.error('Unable to connect to the database:', err.message);
    });

module.exports = database;
