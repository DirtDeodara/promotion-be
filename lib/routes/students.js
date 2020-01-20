const { Router } = require('express');
const Student = require('../models/Student');
const Promotion = require('../models/Promotion');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, date_of_birth, gym } = req.body;
    Student.create({ name, date_of_birth, gym })
      .then(student => {
        res.send(student);
      })
      .catch(next);
  })
  
  .get('/', (req, res, next) => {
    Student.findAll({
      include: {
        model: Promotion
      }
    })
      .then(students => res.send(students
        .map(student => ({
          ...student.toJSON(), promotions: student.promotions[student.promotions.length - 1]
        }))))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Student.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(student => res.send(student))
      .catch(next);
  })
  
  .get('/color/:color', (req, res, next) => {
    Student.findAll({
      include: {
        model: Promotion,
        where: {
          belt_color: req.params.color
        }
      }
    })
      .then(students => res.send(students
        .map(student => ({
          ...student.toJSON(), promotions: student.promotions[student.promotions.length - 1]
        }))))
      .catch(next);
  })


  .put('/:id', (req, res, next) => {
    Student.update(
      { name: req.body.name },
      { returning: true, where: { id: req.params.id } }
    )
      .then((updatedStudent) => {
        // console.log('UPDATED', updatedStudent[1][0].dataValues, 'UPDATED');
        res.json(updatedStudent[1][0]);
      })
      .catch(next);
  })

  .delete('/:id', (req, res) => {
    Student.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(deletedRecord) {
        if(deletedRecord === 1) {
          res.status(200).json({ message: 'Deleted successfully' });
        } else {
          res.status(404).json({ message: 'record not found' });
        }
      })
      .catch(function(error) {
        res.status(500).json(error);
      });
  });
