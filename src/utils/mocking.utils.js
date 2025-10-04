import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const generateMockUsers = async (quantity = 50) => {
  const users = [];
  const hashedPassword = await bcrypt.hash("coder123", 10);

  for (let i = 0; i < quantity; i++) {
    users.push({
      _id: faker.database.mongodbObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: [],
    });
  }

  return users;
};

export const generateMockPets = (quantity = 10) => {
  const pets = [];
  for (let i = 0; i < quantity; i++) {
    pets.push({
      _id: faker.database.mongodbObjectId(),
      name: faker.animal.petName(),
      species: faker.animal.type(),
      age: faker.number.int({ min: 1, max: 15 }),
    });
  }
  return pets;
};
