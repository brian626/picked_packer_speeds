# Picker/Packer Speeds

## Server Installation

The server uses express and requires npm to be installed. Once you have done that, install the server's dependencies via
```
cd server
npm install
```

## Server Configuration

Database credentials are stored in a file called `.env` in the `server` directory. Run the following commands to configure the credentials:

```
cp .env_template .env
vim .env
```

Fill in the values with those provided in email.

## Server Operation

Run the server via
```
node index.js
```


## Client Installation

The client uses react and requires yarn to be installed. Once you have done that, install the client's dependencies via
```
cd client
yarn install
```

## Client Configuration

No configuration should be needed.

## Client Operation

Run the client via
```
yarn start
```

The login page should appear shortly. Login as the supervisor using the credentials provided in email.

You will be taken to the dashboard page, which displays a list of orders and offers the ability to start and stop picking or packing.

To seed the database with orders, click the "Seed Database" button. This will take a few seconds. When it is complete, a paginated list of orders will appear.

To see charts of average pick/pack speeds per employee/per week, click the "Analytics" link in the nav bar.

If you login as an employee, you will be taken to their dashboard, where you can start/stop picking or packing. The "Analytics" link will show you a chart for a single employee.
