// docker ps
// docker exec -it 63b2a0d48180 mongo -u erickwendel -p minhasenhasecreta --authenticationDatabase herois

// show dbs -> Mostra todos os bancos que podemos usar
// use herois -> nosso contexto é a tabela herois

// show collections -> mostra as coleções

//Insere um dado em herois
// db.herois.insert({
//     nome: 'Flash',
//     poder: 'Velocidade',
//     dataNascimento: '1998-01-01'
// })

// db.herois.find() //Procura os dados da coleção herois
// db.herois.find().pretty //Procura os dados da coleção herois

// for(let i =0; i <= 10000; i++){
//     db.herois.insert({
//         nome:`Clone${i}`,
//         poder:'Velocidade',
//         dataNascimento: '1998-01-01'
//     })
// }
// Consigo utilizar laços de repetição numa consulta para colocar mais que um dados
// db.herois.count()
// db.herois.findOne()
// db.herois.find().limit(1000).sort({nome: -1})
// db.herois.find({}, {poder: 1, _id:0})

// create

// db.herois.insert({
//     nome: 'Flash',
//     poder: 'Velocidade',
//     dataNascimento: '1998-01-01'
// })

// read

// db.herois.find()

// update

// db.herois.update(
//   { _id: ObjectId("5df29da8c0a029f87f3b9e66") },
//   { nome: "Mulher Maravilha" }
// );

// db.herois.update(
//   { _id: ObjectId("5df29da8c0a029f87f3b9e66") },
//   { $set: { nome: "Mulher Maravilha" } }
// );

// delete
// db.herois.remove({});
// db.herois.remove({ nome: "Mulher Maravilha" });
