// src/app.js
import express from "express";
import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import adoptionRouter from "./routes/adoption.router.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./swagger.js";

const app = express();

app.use(express.json());

// Swagger UI
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Rutas
app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/adoptions", adoptionRouter);

export default app;
