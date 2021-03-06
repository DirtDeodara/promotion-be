const { Router } = require('express');
const Student = require('../models/Student');

module.exports = Router()
  .get('/', (req, res, next) => {
    Student.findAll()
      .then(students => res.send(students))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    const { name, date_of_birth } = req.body;
    Student.create({ name, date_of_birth })
      .then(student => {
        res.send(student);
      })
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Student.update(
      { name: req.body.name },
      { returning: true, where: { id: req.params.id } }
    )
      .then((updatedStudent) => {
        console.log('UPDATED', updatedStudent[1][0].dataValues, 'UPDATED');
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
