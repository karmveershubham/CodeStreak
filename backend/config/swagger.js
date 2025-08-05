import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Codestreak API',
      version: '1.0.0',
      description: 'API documentation for Codestreak - AI-Powered Daily Coding Companion',
    },
    servers: [
      {
        url: 'http://localhost:8000', 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
    tags: [
      { name: 'Users', description: 'User Authentication APIs' },
      { name: 'Goals', description: 'Goal Management APIs' },
      { name: 'Streaks', description: 'Streak Tracking APIs' },
      { name: 'Weekly Plans', description: 'Weekly Plan and Progress Tracking APIs' },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
