const { Model, STRING, NUMBER } = require('sequelize');
const sequelize = require('../utils/connect');
 
class Promotion extends Model {}

Promotion.init({
  student_id: {
    type: STRING,
    allowNull: false
  },
  belt_color: {
    type: STRING,
    allowNull: false
  },
  stripes: {
    type: NUMBER,
    allowNull: false
  },
  coach_who_promoted: {
    type: STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'promotion',
  timestamps: false
});

module.exports = Promotion;
