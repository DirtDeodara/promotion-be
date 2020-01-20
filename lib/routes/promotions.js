const { Router } = require('express');
const Promotion = require('../models/Promotion');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { belt_color, stripes, coach_who_promoted, studentId } = req.body;
    Promotion.create({
      belt_color,
      stripes,
      coach_who_promoted,
      studentId
    })
      .then(promotion => res.send(promotion))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Promotion.findAll()
      .then(promotions => res.send(promotions))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promotion.findAll({
      where: {
        studentId: req.params.id
      },
      order: [['createdAt', 'DESC']],
      limit: 1
    })
      .then(promotion => res.send(promotion[0]))
      .catch(next);
  });
