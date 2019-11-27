const { Model, STRING, DATE } = require('sequelize');
const sequelize = require('../utils/connect');
 
class Student extends Model {}

Student.init({
  name: {
    type: STRING,
    allowNull: false
  },
  date_of_birth: {
    type: DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'student',
  timestamps: false
});

module.exports = Student;

