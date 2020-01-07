const assert = require("assert");
const PasswordHelper = require("../src/helpers/passwordHelper");

const SENHA = "123";
const HASH = "$2b$04$Um2u0lzB.U9yNuB5dkkeTOp3.5myKjXVRK04M5BHiVnrOLGaSYcVO";

describe("UserHelper test suite", function() {
  this.timeout(Infinity);
  it("deve gerar um hash", async () => {
    const result = await PasswordHelper.hashPassword(SENHA);
    assert.ok(result.length > 10);
  });

  it("Deve comparar uma senha e seu hash", async () => {
    const result = await PasswordHelper.comparePassword(SENHA, HASH);
    assert.ok(result);
  });
});
