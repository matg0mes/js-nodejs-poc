const assert = require("assert");
const api = require("../api");
const Context = require("./../src/db/strategies/base/contextStrategy");
const PostGres = require("./../src/db/strategies/postgres/postgres");
const UsuarioSchema = require("../src/db/strategies/postgres/schemas/usuarioSchema");

let app = {};
const USER = {
  username: "Xuxadasilva",
  password: "123"
};

const USER_DB = {
  username: USER.username.toLowerCase(),
  password: "$2b$04$91u1M8f3AB8QJ80iHUIgX.G0PlzYld/oDTS3tBZyJ1QVCYsflkyHu"
};

describe("Auth test suite", function() {

  this.beforeAll(async () => {
    app = await api;

    const connectionPostgres = await PostGres.connect();
    const model = await PostGres.defineModel(connectionPostgres, UsuarioSchema);
    const postgres = await new Context(new PostGres(connectionPostgres, model));
    await postgres.update(null, USER_DB, true);
  });

  it("Deve obter um token", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: USER
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  });

  it("Deve retornar não autorizado ao tentar obter um login errado", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: {
        username: "erickwendel",
        password: "123"
      }
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 401);
    assert.deepEqual(dados.error, "Unauthorized");
  });
});
