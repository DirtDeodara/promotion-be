const { Router } = require('express');
const Student = require('../models/Student');

module.exports = Router()
  .get('/', (req, res, next) => {
    Student
      .findAll()
      .then(students => res.send(students))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    const { name, date_of_birth } = req.body;
    Student
      .create({ name, date_of_birth })
      .then(student => {
        res.send(student);
      })
      .catch(next);
  });
