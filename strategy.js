class NotImplementedException extends Error {
    constructor() {
        super("Not implemented Exception");
    }
};

class Icrud {
    create(item) {
        throw new NotImplementedException();
    };

    read(query) {
        throw new NotImplementedException();
    };

    update(id, item) {
        throw new NotImplementedException();
    };

    delete(id) {
        throw new NotImplementedException();
    }
};

class MongoDB extends Icrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo em MongoDB')
    }
}

class Postgres extends Icrud {
    constructor() {
        super();
    };

    create(item) {
        console.log('O item foi salvo em postgres');
    };
}



const contextMongo = new ContextStrategy(new MongoDB());
contextMongo.create('batata')
const contextPostgres = new ContextStrategy(new Postgres());
contextPostgres.create('oi')

contextPostgres.delete(1);