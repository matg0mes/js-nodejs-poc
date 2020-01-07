const { config } = require("dotenv");
const { join } = require("path");
const { ok } = require("assert");

const env = process.env.NODE_ENV || "dev";

ok(env === "prod" || env === "dev", "A env é invalida, ou dev ou prod");

const configPath = join(__dirname, "./config", `.env.${env}`);
config({
  path: configPath
});

const Hapi = require("hapi");
const Context = require("./src/db/strategies/base/contextStrategy");
const MongoDb = require("./src/db/strategies/mongodb/mongodb");
const HeroiSchema = require("./src/db/strategies/mongodb/schemas/heroisSchema");
const HeroRoute = require("./src/routes/heroRoutes");
const AuthRoutes = require("./src/routes/authRoutes");

const Postgres = require("./src/db/strategies/postgres/postgres");
const UsuarioSchema = require("./src/db/strategies/postgres/schemas/usuarioSchema");

const HapiSwagger = require("hapi-swagger");
const Vision = require("vision");
const Inert = require("inert");

const HapiJwt = require("hapi-auth-jwt2");
const JWT_SECRET = process.env.JWT_KEY;

const app = new Hapi.Server({
  port: process.env.PORT
});

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

async function main() {
  const connection = MongoDb.connect();
  const context = new Context(new MongoDb(connection, HeroiSchema));

  const connectionPostgres = await Postgres.connect();
  const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema);
  const contextPostgres = new Context(new Postgres(connectionPostgres, model));

  const swaggerOptions = {
    info: {
      titulo: "API herois no curso NodeBR",
      version: "1.0"
    },
    lang: "pt"
  };
  await app.register([
    HapiJwt,
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      option: swaggerOptions
    }
  ]);

  app.auth.strategy("jwt", "jwt", {
    key: JWT_SECRET,
    // options: {
    //   expiresIn: 20
    // },
    validate: (dado, request) => {
      // Verifica no banco se usuario continua ativo
      // Verifica no banco se usuario continua pagando

      return {
        isValid: true
      };
    }
  });

  app.auth.default("jwt");

  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(
      new AuthRoutes(JWT_SECRET, contextPostgres),
      AuthRoutes.methods()
    )
  ]);

  await app.start();
  console.log("Servidor está rodando", app.info.port);

  return app;
}

module.exports = main();
