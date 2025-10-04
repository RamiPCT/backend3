import { Router } from "express";
import { generateMockUsers, generateMockPets } from "../utils/mocking.utils.js";
import { UserModel } from "../models/user.model.js";
import { PetModel } from "../models/pet.model.js";

const router = Router();

// ✅ /api/mocks/mockingpets
router.get("/mockingpets", (req, res) => {
  const pets = generateMockPets(10);
  res.json({ status: "success", payload: pets });
});

// ✅ /api/mocks/mockingusers
router.get("/mockingusers", async (req, res) => {
  try {
    const users = await generateMockUsers(50);
    res.json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ✅ /api/mocks/generateData
router.post("/generateData", async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    const mockUsers = await generateMockUsers(users);
    const mockPets = generateMockPets(pets);

    const insertedUsers = await UserModel.insertMany(mockUsers);
    const insertedPets = await PetModel.insertMany(mockPets);

    res.json({
      status: "success",
      message: "Datos generados e insertados correctamente",
      usersInserted: insertedUsers.length,
      petsInserted: insertedPets.length,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
