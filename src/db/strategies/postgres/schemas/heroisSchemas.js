const Sequelize = require("sequelize");

const HeroiSchema = {
  neme: "herois",
  schema: {
    id: {
      type: Sequelize.INTEGER,
      required: true,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: Sequelize.STRING,
      required: true
    },
    poder: {
      type: Sequelize.STRING,
      required: true
    }
  },
  options: {
    tableName: "TB_HEROES",
    freezeTableName: false,
    timestamps: false
  }
};

module.exports = HeroiSchema;
