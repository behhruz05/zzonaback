const swaggerJsdoc = require('swagger-jsdoc');

const servers = [
  { url: 'https://zzonaback-production.up.railway.app', description: 'Production' },
  { url: `http://localhost:${process.env.PORT || 3000}`, description: 'Local' },
];

const options = { 
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shop API',
      version: '1.0.0',
      description: 'Products & Categories CRUD API',
    },
    servers,
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
