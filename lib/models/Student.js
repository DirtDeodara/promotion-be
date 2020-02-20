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
  },
  gym: {
    type: STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'student',
  timestamps: false
});

Student.getAllStudents = function() {
  return sequelize.query(`
    SELECT 	s.*, p.*
    FROM 	students s
    JOIN 	promotions p
    ON		s.id = p."studentId"
    JOIN	(
		    SELECT "studentId", max("createdAt") as last_promotion
		    FROM  	promotions
		    GROUP BY "studentId"
		    ) as latest
    ON		p."studentId" = latest."studentId"
    AND		p."createdAt" = latest.last_promotion;
  `)
    .then(([students]) => students);
};

Student.getByColor = function(color) {
  return sequelize.query(`
    SELECT 	s.*, p.*
    FROM 	students s
    JOIN 	promotions p
    ON		s.id = p."studentId"
    JOIN	(
		    SELECT "studentId", max("createdAt") as last_promotion
		    FROM  	promotions
		    GROUP BY "studentId"
		    ) as latest
    ON		p."studentId" = latest."studentId"
    AND		p."createdAt" = latest.last_promotion
    WHERE	p.belt_color = '${color}';
  `)
    .then(([students]) => students);
};

Student.getByName = function(name) {
  return sequelize.query(`
    SELECT 	s.*, p.*
    FROM 	students s
    JOIN 	promotions p
    ON		s.id = p."studentId"
    JOIN	(
        SELECT "studentId", max("createdAt") as last_promotion
        FROM  	promotions
        GROUP BY "studentId"
        ) as latest
    ON		p."studentId" = latest."studentId"
    AND		p."createdAt" = latest.last_promotion
    WHERE	s.name % '%${name}%';
  `)
    .then(([students]) => students);
};

Student.getAllAdults = function() {
  return sequelize.query(`
    SELECT 	s.*, p.*
    FROM 	students s
    JOIN 	promotions p
    ON		s.id = p."studentId"
    JOIN	(
        SELECT "studentId", max("createdAt") as last_promotion
        FROM  	promotions
        GROUP BY "studentId"
        ) as latest
    ON		p."studentId" = latest."studentId"
    AND		p."createdAt" = latest.last_promotion
    WHERE	age(s.date_of_birth) >= interval '18 years';
  `)
    .then(([students]) => students);
};

Student.getAllTeens = function() {
  return sequelize.query(`
    SELECT 	s.*, p.*
    FROM 	students s
    JOIN 	promotions p
    ON		s.id = p."studentId"
    JOIN	(
        SELECT "studentId", max("createdAt") as last_promotion
        FROM  	promotions
        GROUP BY "studentId"
        ) as latest
    ON		p."studentId" = latest."studentId"
    AND		p."createdAt" = latest.last_promotion
    WHERE	age(s.date_of_birth) >= interval '13 years' AND age(s.date_of_birth) <= interval '17 years 364 days';
  `)
    .then(([students]) => students);
};

Student.getAllKids = function() {
  return sequelize.query(`
    SELECT 	s.*, p.*
    FROM 	students s
    JOIN 	promotions p
    ON		s.id = p."studentId"
    JOIN	(
        SELECT "studentId", max("createdAt") as last_promotion
        FROM  	promotions
        GROUP BY "studentId"
        ) as latest
    ON		p."studentId" = latest."studentId"
    AND		p."createdAt" = latest.last_promotion
    WHERE	age(s.date_of_birth) <= interval '12 years';
  `)
    .then(([students]) => students);
};


module.exports = Student;

