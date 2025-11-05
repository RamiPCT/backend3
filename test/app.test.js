import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Test de la API de productos", () => {
  it("Debe devolver el listado de productos", async () => {
    const res = await requester.get("/api/products");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
  });
});
