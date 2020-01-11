const { Model, STRING, INTEGER } = require('sequelize');
const sequelize = require('../utils/connect');
const Student = require('./Student');
 
class Promotion extends Model {}

Promotion.init({
  belt_color: {
    type: STRING,
    allowNull: false
  },
  stripes: {
    type: INTEGER,
    allowNull: false
  },
  coach_who_promoted: {
    type: STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'promotion',
  timestamps: true
});

Promotion.belongsTo(Student);
Student.hasMany(Promotion);

module.exports = Promotion;
