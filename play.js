require('dotenv').config();
const sequelize = require('./lib/utils/connect');

const Student = require('./lib/models/Student');

Student.findAll().then(students => console.log(students[0]));
