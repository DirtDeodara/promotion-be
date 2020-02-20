const youthBelts = [
  'white-white-white',
  'yellow-white-yellow',
  'grey-black-grey',
  'grey-grey-grey',
  'grey-white-grey'
];

const adultBelts = [
  'white-white-white',
  'white-yellow-white',
  'white-orange-white',
  'white-green-white',
  'blue-blue-blue',
  'purple-purple-purple',
  'brown-brown-brown',
  'black-black-black'
];

const nextBelt = (student) => {
  const year = new Date().getFullYear();
  const belts = year - student.date_of_birth.getFullYear() > 14 ? adultBelts : youthBelts;
  const lastPromotion = student.promotions[student.promotions.length - 1].belt_color;
  const beltIndex = belts.indexOf(lastPromotion);
  return belts[beltIndex + 1];
};

module.exports = nextBelt;
