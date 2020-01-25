const { Router } = require('express');
const Student = require('../models/Student');
const Promotion = require('../models/Promotion');
const nextBelt = require('../utils/beltTypes');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, date_of_birth, gym } = req.body;
    Student.create({ name, date_of_birth, gym })
      .then(student => {
        res.send(student);
        Promotion.create({ //TODO does this seem right? its seems to work, but im not sure about it.
          belt_color: 'white/white/white',
          stripes: 0,
          coach_who_promoted: 'Chris',
          studentId: student.id
        })
          .then(promotion => res.send(promotion))
          .catch(next);
      })
      .catch(next);
  })

  .post('/:id/stripe', (req, res, next) => {
    const { coach_who_promoted } = req.body;
    Student.findOne({
      include: {
        model: Promotion
      },
      where: {
        id: req.params.id
      }
    })
      .then(student => {
        const latestPromotion = student.promotions[student.promotions.length - 1];
        return Promotion.create({
          belt_color: latestPromotion.belt_color,
          stripes: latestPromotion.stripes + 1, //TODO dont allow over 4 stripes
          coach_who_promoted,
          studentId: req.params.id
        });
      })
      .then(promotion => res.send(promotion))
      .catch(next);
  })

  .post('/:id/belt', (req, res, next) => {
    const { coach_who_promoted } = req.body;
    Student.findOne({
      include: {
        model: Promotion
      },
      where: {
        id: req.params.id
      }
    })
      .then(student => {
        return Promotion.create({
          belt_color: nextBelt(student), //TODO handle blackbelt sitch
          stripes: 0, 
          coach_who_promoted,
          studentId: req.params.id
        });
      })
      .then(promotion => res.send(promotion))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Student.findAll({
      include: {
        model: Promotion
      }
    })
      .then(students =>
        res.send(
          students
            .map(student => ({
              ...student.toJSON(),
              promotions: student.promotions[student.promotions.length - 1]
            }))
            .sort((a, b) => {
              return a.promotions.dataValues.id - b.promotions.dataValues.id; //TODO figure out if this could be done better
            })
        )
      )
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Student.findOne({
      include: {
        model: Promotion
      },
      where: {
        id: req.params.id
      }
    })
      .then(student =>
        res.send({
          ...student.toJSON(),
          promotions: student.promotions[student.promotions.length - 1],
          nextBeltColor: nextBelt(student)
        })
      )
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
      .then(students =>
        res.send(
          students.map(student => ({
            ...student.toJSON(),
            promotions: student.promotions[student.promotions.length - 1]
          }))
        )
      )
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Student.update(
      { name: req.body.name },
      { returning: true, where: { id: req.params.id } }
    )
      .then(updatedStudent => {
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
