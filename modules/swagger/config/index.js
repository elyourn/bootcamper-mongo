const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Series Callendar API',
            description: 'Series callebdar API Information',
            license: {
                name: 'MIT',
                url: 'https://choosealicense.com/licenses/mit/',
            },
            version: '1.0.0',
            contact: {
                name: 'BGU team',
            },
            servers: ['http://localhost:5000'],
        },
        host: 'localhost:5000',
        basePath: '/',
    },
    apis: ['./modules/users/router/index.js'],
};

exports.swaggerConfig = swaggerOptions;
