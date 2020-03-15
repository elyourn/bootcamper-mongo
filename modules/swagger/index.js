const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { swaggerConfig } = require('./config');

const router = express.Router();

// Swagger declaration
const specs = swaggerJsdoc(swaggerConfig);

router.use('/swagger-docs', swaggerUi.serve);
router.get('/swagger-docs', swaggerUi.setup(specs, { explorer: true }));

module.exports = router;
