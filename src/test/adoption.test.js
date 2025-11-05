// test/adoption.test.js
import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";

describe("Adoption Router - funcional", function () {
  let createdId;

  it("POST /api/adoptions -> crea adopción y devuelve 201", async function () {
    const res = await request(app).post("/api/adoptions").send({ name: "Test Pet" });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("payload");
    expect(res.body.payload).to.have.property("id");
    createdId = res.body.payload.id;
  });

  it("GET /api/adoptions -> devuelve lista 200", async function () {
    const res = await request(app).get("/api/adoptions");
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("payload");
  });

  it("GET /api/adoptions/:id -> devuelve 200 para id creado", async function () {
    const res = await request(app).get(`/api/adoptions/${createdId}`);
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.have.property("id", createdId);
  });

  it("PUT /api/adoptions/:id -> actualiza y devuelve 200", async function () {
    const res = await request(app).put(`/api/adoptions/${createdId}`).send({ name: "Updated" });
    expect(res.status).to.equal(200);
    expect(res.body.payload).to.have.property("name", "Updated");
  });

  it("DELETE /api/adoptions/:id -> elimina y devuelve 200", async function () {
    const res = await request(app).delete(`/api/adoptions/${createdId}`);
    expect(res.status).to.equal(200);
  });
});
