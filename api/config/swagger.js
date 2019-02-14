const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  info: {
    title: 'REST API for item', // Title of the documentation
    version: '1.0.0', // Version of the app
    description: 'This is the REST API for item', // short description of the app
  },
  host: 'localhost:8080', // the host or url of the app
  basePath: '/api/v1/item', // the basepath of your endpoint
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./api/docs/**/*.yaml'],
};
module.exports = swaggerJSDoc(options);
