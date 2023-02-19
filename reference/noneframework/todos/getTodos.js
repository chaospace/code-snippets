import {faker} from 'https://cdn.skypack.dev/@faker-js/faker';

const createElement = () => ({
  text: faker.random.word(2),
  completed: Math.random() > 0.4 ? true : false
});

const repeat = (elementFactory, number) => {
  const array = [];
  for (let index = 0; index < number; index++) {
    array.push(elementFactory());
  }
  return array;
};

export default () => {
  const howMany = 10;
  return repeat(createElement, howMany);
};
