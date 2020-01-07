const assert = require("assert");
const MongoDb = require("../src/db/strategies/mongodb/mongodb");
const Context = require("../src/db/strategies/base/contextStrategy");
const HeroiSchema = require("./../src/db/strategies/mongodb/schemas/heroisSchema");

const MOCK_HEROI_CADASTRAR = {
  nome: "Mulher Maravilha",
  poder: "laço"
};
const MOCK_HEROI_DEFAULT = {
  nome: `Homem Aranha ${Date.now()}`,
  poder: "Super teia"
};
const MOCK_HEROI_ATUALIZAR = {
  nome: `Patolino${Date.now()}`,
  poder: "Velocidade"
};

let MOCK_HEROI_ID = "";

let context = {};

describe("Mongodb Suite de testes", function() {
  this.beforeAll(async () => {
    const connection = MongoDb.connect();
    context = new Context(new MongoDb(connection, HeroiSchema));

    await context.create(MOCK_HEROI_DEFAULT);
    const result = await context.create(MOCK_HEROI_ATUALIZAR);
    MOCK_HEROI_ID = result._id;
  });
  it("verificar conexao", async () => {
    const result = await context.isConnected();
    const expected = "Conectado";

    assert.deepEqual(result, expected);
  });
  it("cadastrar", async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
    assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
  });
  it("listar", async () => {
    const [{ nome, poder }] = await context.read(
      {
        query: { nome: MOCK_HEROI_DEFAULT.nome }
      },
      200,
      3
    );
    const result = { nome, poder };
    assert.deepEqual(result, MOCK_HEROI_DEFAULT);
  });
  it("atualicar", async () => {
    const result = await context.update(MOCK_HEROI_ID, {
      nome: "Pernalonga"
    });
    assert.deepEqual(result.nModified, 1);
  });
  it("deletar", async () => {
    const result = await context.delete(MOCK_HEROI_ID);
    assert.deepEqual(result.n, 1);
  });
});
