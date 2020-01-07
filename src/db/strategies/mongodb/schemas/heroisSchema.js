const Mongoose = require("mongoose");

const heroiSchema = new Mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    poder: {
      type: String,
      required: true
    },
    insertedAt: {
      type: Date,
      default: new Date()
    }
  },
  { strict: false }
);

module.exports = Mongoose.models.heroi || Mongoose.model("heroi", heroiSchema);
