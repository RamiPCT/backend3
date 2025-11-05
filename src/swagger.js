// src/swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend3 - API",
      version: "1.0.0",
      description: "Documentación Swagger del módulo Users",
    },
    servers: [{ url: "http://localhost:8080" }],
  },
  apis: ["./src/routes/*.js"],
};

export const swaggerSpecs = swaggerJSDoc(options);
