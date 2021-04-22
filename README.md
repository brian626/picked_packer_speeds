# Picker/Packer Speeds

## Server Installation

The server uses express and requires npm to be installed. Once you have done that, install the server's dependencies via
```
npm install
```

## Server Configuration

Database credentials are stored in a file called `.env` in the `server` directory. Run the following commands to configure the credentials:

```
cp .env_template .env
vim .env
```

Fill in the values with those provided.

## Server Operation

Run the server via
```
node index.js
```


## Client Installation

The client uses react and requires yarn to be installed. Once you have done that, install the client's dependencies via
```
yarn install
```

## Client Configuration

No configuration should be needed.

## Client Operation

Run the client via
```
yarn start
```
