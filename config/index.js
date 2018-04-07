module.exports = {
    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000
    },
    database: {
        username: process.env.APP_DB_USER,
        name: process.env.APP_DB_NAME,
        password: process.env.APP_DB_PASS,
        options: {
            host: process.env.MYSQL_SERVICE_HOST || 'localhost',
            port: process.env.MYSQL_SERVICE_PORT || 3306,
            dialect: 'mysql',
            freezeTableName: true,
            define: {
                timestamps: false
            },
            pool: {
                max: 9,
                min: 0,
                idle: 10000
            }
        }
    },
    microservicesLinks: {
        fileStorageServerLink: `${process.env.FILE_STORAGE_MANAGER_SERVICE_SCHEME || 'http'}://${process.env.FILE_STORAGE_MANAGER_SERVICE_HOST}:${process.env.FILE_STORAGE_MANAGER_SERVICE_PORT}${process.env.FILE_STORAGE_MANAGER_SERVICE_PATH || '/'}`,
        emailApiServerLink: `${process.env.EMAIL_SERVICE_SERVICE_SCHEME || 'http'}://${process.env.EMAIL_SERVICE_SERVICE_HOST}:${process.env.EMAIL_SERVICE_SERVICE_PORT}${process.env.EMAIL_SERVICE_SERVICE_PATH || '/'}`,
        multiDBApiServerLink: `${process.env.MULTI_DB_SERVICEE_SCHEME || 'http'}://${process.env.MULTI_DB_SERVICE_HOST}:${process.env.MULTI_DB_SERVICE_PORT}${process.env.MULTI_DB_SERVICE_PATH || '/'}`
    }
};