
<p align="center">
  <a href="https://github.com/FoxGreedy">
    <img src="https://i.imgur.com/RadC5Gt.png" width="160">
  </a>
</p>

<hr />

# POSTGRES

## Banco de dados
```node
docker run --name postgres -e POSTGRES_USER=matheus -e POSTGRES_PASSWORD=minhasenhasecreta -e POSTGRES_DB=heroes -p 5432:5432 -d postgres
```

## Client Banco - Adminer

```node
docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer
```

# MONGODB

## Banco de dados
```node
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=secret -d mongo:4
```

## Client Banco

```node
docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient
```

## Create User

```node
docker exec -it mongodb mongo --host localhost -u admin -p secret --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'erickwendel', pwd:'minhasenhasecreta', roles: [{role: 'readWrite', db: 'herois'}]})"
```
