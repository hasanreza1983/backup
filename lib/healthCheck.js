const { database } = require('./../config');
const sequelize = require('./../models').sequelize;

const readiness = async (req, res) => {
    let result = { Status: 'Red', Services: { Mysql: { Status: 'Failed' } } };
    try {
        if (database.name && database.username && database.password && database.options.host) {

            sequelize.authenticate()
                .then(function (errors) {
                    result.Status = "Green";
                    result.Services.Mysql.Status = "OK";
                    res.status(200).json(result);
                })
                .catch((err) => {
                    result.Status = "Red";
                    result.Services.Mysql.Message = "Unable to connect to MySQL server";
                    res.status(500).json(result);
                });
        }
        else {
            result.Services.Mysql["Message"] = 'Incorrect MySQL config found';
            res.status(500).json(result);
        }
    }
    catch (error) {
        res.status(500).json(Object.assign({}, result, error));
    }
}
const liveness = (req, res) => {
    res.sendStatus(200);
}

module.exports = {
    readiness,
    liveness
};