const BaseRoute = require("./base/BaseRoute");
const Joi = require("joi");
const Boom = require("boom");
const failAction = (request, header, erro) => {
  throw erro;
};

// npm i jsonwebtoken
const Jwt = require("jsonwebtoken");
const PassworsHelper = require("./../helpers/passwordHelper");

class AuthRoutes extends BaseRoute {
  constructor(secret, db) {
    super();
    this.secret = secret;
    this.db = db;
  }
  login() {
    return {
      path: "/login",
      method: "POST",
      config: {
        auth: false,
        tags: ["api"],
        description: "Obter token",
        notes: "faz login com user e senha do banco",
        validate: {
          failAction,
          payload: {
            username: Joi.string().required(),
            password: Joi.string().required()
          }
        },
        handler: async request => {
          const { username, password } = request.payload;

          const [usuario] = await this.db.read({
            username: username.toLowerCase()
          });

          if (!usuario) {
            return Boom.unauthorized("O Usuario informado não existe");
          }

          const match = await PassworsHelper.comparePassword(
            password,
            usuario.password
          );

          if (!match) {
            return Boom.unauthorized("O usuario ou senha inválido");
          }

          const token = Jwt.sign(
            {
              username: username,
              id: usuario.id
            },
            this.secret
          );

          return {
            token
          };
        }
      }
    };
  }
}

module.exports = AuthRoutes;
