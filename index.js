const ContextStrategy = require('./src/db/strategies/base/contextStrategy');
const MongoDB = require('./db/strategies/mongodb');
const Postgres = require('./db/strategies/postgres');

const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create('batata')
const contextPostgres = new ContextStrategy(new Postgres());
contextPostgres.create('oi')

