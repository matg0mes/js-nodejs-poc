const Mongoose = require("mongoose");

Mongoose.connect(
  "mongodb://erickwendel:minhasenhasecreta@localhost:27017/herois",
  { useNewUrlParser: true },
  function(error) {
    if (!error) return;
    console.log("Falha na conexão!");
  }
);

const connection = Mongoose.connection;

connection.once("open", () => console.log("Database rodando..."));
connection.once("connected", () => console.log("Database conectado"));
connection.once("disconnected", () => console.log("Database desconectado"));

const heroiSchema = new Mongoose.Schema({
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
});

const model = Mongoose.model('herois', heroiSchema)

async function main(){
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinherio',
    }) 

    console.log('result Cadastrar', resultCadastrar);

    const listItems = await model.find();
    console.log('items', listItems)
};

main();