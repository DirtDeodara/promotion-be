require('dotenv').config();
const sequelize = require('./lib/utils/connect');
const app = require('./lib/app');

const PORT = process.env.PORT || 7890;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on ${PORT}`);
});
