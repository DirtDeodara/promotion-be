const { Model, STRING, DATE } = require('sequelize');
const sequelize = require('../utils/connect');
 
class Promotion extends Model {}

Promotion.init({
  student_id: {
    type: STRING,
    allowNull: false
  },
  date_of_birth: {
    type: DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'promotion',
  timestamps: false
});

module.exports = Promotion;
