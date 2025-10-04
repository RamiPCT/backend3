import express from "express";
import mocksRouter from "./routes/mocks.router.js";
import { connectDB } from "./database.js";

const app = express();
const PORT = 8080;

app.use(express.json());

// Ruta base
app.use("/api/mocks", mocksRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
