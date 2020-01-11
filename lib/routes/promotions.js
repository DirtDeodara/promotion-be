const { Router } = require('express');
const Promotion = require('../models/Promotion');

module.exports = Router()
  .get('/', (req, res, next) => {
    Promotion.findAll()
      .then(promotions => res.send(promotions))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promotion.findOne({
      where: {
        studentId: req.params.id
      }
    })
      .then(promotion => res.send(promotion))
      .catch(next);
  });
