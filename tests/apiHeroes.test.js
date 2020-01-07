const assert = require("assert");
const api = require("../api");

let app = {};
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGFkYXNpbHZhIiwiaWQiOjEsImlhdCI6MTU3ODM0NzMxNX0.bUUXDsRHQEPhpSzP-i9KzHqASmsIT-te1uHzK5itexo";

const headers = {
  Authorization: TOKEN
};

const MOCK_HEROIS_CADASTRAR = {
  nome: "Chapolin Colorado",
  poder: "Marreta bionica"
};
const MOCK_HEROIS_INICIAL = {
  nome: "Gavião Negro",
  poder: "A mira"
};
let MOCK_ID = "";

describe("Suite de testes da API Heroes", function() {
  this.beforeAll(async () => {
    app = await api;
    const result = await app.inject({
      method: "POST",
      url: "/herois",
      headers,
      payload: JSON.stringify(MOCK_HEROIS_INICIAL)
    });
    const dados = JSON.parse(result.payload);
    MOCK_ID = dados._id;
  });

  it("listar /herois", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/herois",
      headers
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });

  it("listar /herois - deve retornar somente 3 registros", async () => {
    const TAMANHO_LIMITE = 4;
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
      headers
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === TAMANHO_LIMITE);
  });

  it("listar /herois - deve filtrar um item por parte do nome", async () => {
    const NAME = "ilha";
    const result = await app.inject({
      method: "GET",
      url: `/herois?nome=${NAME}`,
      headers
    });

    const [dados] = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.nome === "Mulher Maravilha");
  });
  it("listar /herois - deve lançar uma excessão se as querys estiverem vindo erradas", async () => {
    const TAMANHO_LIMITE = "AEEE";
    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
      headers
    });

    assert.deepEqual(result.statusCode, 400);
  });
  it("cadastrar POST - herois", async () => {
    const result = await app.inject({
      method: "POST",
      url: `/herois`,
      payload: MOCK_HEROIS_CADASTRAR,
      headers
    });

    const statusCode = result.statusCode;
    const { message, _id } = JSON.parse(result.payload);
    assert.ok(statusCode);
    assert.notEqual(_id, undefined);
    assert.deepEqual(message, "Herois Cadastrado com sucesso!");
  });
  it("atualizar PATCH - /herois/:id", async () => {
    const _id = MOCK_ID;
    const expected = {
      poder: "Super Mira"
    };

    const result = await app.inject({
      method: "PATCH",
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected),
      headers
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    console.log(statusCode, dados);
    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Herois atualizado com sucesso!");
  });
  it("atualizar PATCH - /herois/:id - não deve atualizar com ID incorreto", async () => {
    const _id = `5dfd418f4c27f243d0475343`;
    const expected = {
      poder: "Super Mira"
    };

    const result = await app.inject({
      method: "PATCH",
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected),
      headers
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    console.log(statusCode, dados);
    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, "Não foi possível atualizar");
  });
  it("remover DELETE - /herois/:id", async () => {
    const _id = MOCK_ID;
    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`,
      headers
    });
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode == 200);
    assert.deepEqual(dados.message, "Herois removido com sucesso!");
  });
  it("remover DELETE - /herois/:id - não deve remover", async () => {
    const _id = "5e0114613bda7c04145dffe1";
    const result = await app.inject({
      method: "DELETE",
      url: `/herois/${_id}`,
      headers
    });
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode == 412);
    assert.deepEqual(dados.message, "Precondition Failed");
  });
});
