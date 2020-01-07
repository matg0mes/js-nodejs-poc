const assert = require("assert");
const Postgres = require("./../src/db/strategies/postgres/postgres");
const HeroisSchema = require("./../src/db/strategies/postgres/schemas/heroisSchemas");
const Context = require("./../src/db/strategies/base/contextStrategy");

const MOCK_HEROI_CADASTRAR = { nome: "Gaviao Negro", poder: "flechas" };
const MOCK_HEROI_ATUALIZAR = { nome: "Batman", poder: "Dinheiro" };

let context = {};

describe("Postgres Strategy", function() {
  this.timeout(Infinity);
  this.beforeAll(async function() {
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, HeroisSchema);

    context = new Context(new Postgres(connection, model));
    await context.delete();
    await context.create(MOCK_HEROI_ATUALIZAR);
  });
  it("PostgresSQL Connection", async function() {
    const result = await context.isConnected();
    assert.equal(result, true);
  });
  it("Cadastrar", async function() {
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    delete result.id;
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });
  it("Listar", async function() {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
    // pegar a primeira posicao
    // const posicaoZero = result[0];
    // const [posicao1, posicao2] = ['Esse é o 1', 'Esse é o 2]
    delete result.id;
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });
  it("Atualizar", async function() {
    const [itemAtualizar] = await context.read({
      nome: MOCK_HEROI_ATUALIZAR.nome
    });
    const novoItem = {
      ...MOCK_HEROI_ATUALIZAR,
      nome: "Mulher Maravilha"
    };
    const [result] = await context.update(itemAtualizar.id, novoItem);
    const [itemAtualizado] = await context.read({ id: itemAtualizar.id });
    assert.deepEqual(result, 1);
    assert.deepEqual(itemAtualizado.nome, novoItem.nome);

    // No Javascript temos uma tecnica chamada rest spread que é uma tecnica que serve para mergear objetos ou separa-lo
    // {nome:'Batman', poder: 'Dinheiro'}
    // {dataNascimento: '1998-01-01'}
    // resultado
    // {nome:'Batman', poder: 'Dinheiro', dataNascimento: '1998-01-01'}
  }),
    it("Remover por id", async function() {
      const [item] = await context.read({});
      const result = await context.delete(item.id);
      assert.deepEqual(result, 1);
    });
});
