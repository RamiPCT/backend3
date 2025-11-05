// src/server.js
import app from "./app.js";
import { connectDB } from "./database.js";

const PORT = process.env.PORT || 8080;

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  });
};

start();
