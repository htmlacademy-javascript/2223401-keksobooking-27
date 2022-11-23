import { getRandomArrayElement } from './util.js';
import { getRandomPositiveInteger } from './util.js';
import { getRandomPositiveFloat } from './util.js';
const count = 10;
const title = [
  'Уютный номер у моря',
  'Горячее предложение месяца',
  'Квартира с мебелью',
  'Срочная продажа',
];
const type = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const checkin = [
  '12: 00',
  '13: 00',
  '14: 00',
];
const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const description = [
  'Рядом сосновый лес, чистый воздух',
  'Евроремонт, джакузи',
  'Утепленный балкон',
  'Газовая котельная, низкие коммунальные платежи',
];
const photos = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
// Функция создания ссылки на изображение (аватарку)
const createAuthor = () => {
  if (getRandomPositiveInteger(1, count) < count) {
    return `img/avatars/user0${getRandomPositiveInteger(1, count)}.png`;
  }
  return {
    avatar: `img/avatars/user${getRandomPositiveInteger(1, count)}.png`,
  };
};
// Функция генерации features, массив строк — массив случайной длины из значений
const createFeatures = () =>
  Array.from({ length: getRandomPositiveInteger(1, 5) }, () =>
    getRandomArrayElement(features));
// Функция создания одного объявления
const createAdvert = () => {
  const randomx = getRandomPositiveFloat(48.00000, 36.56000, 5);
  const randomy = getRandomPositiveFloat(54.00000, 39.48000, 5);
  return {
    author: {
      avatar: createAuthor(),
    },
    offer: {
      title: getRandomArrayElement(title),
      address: `${randomx}, ${randomy}`,
      price: getRandomPositiveInteger(0, 100000),
      type: getRandomArrayElement(type),
      rooms: getRandomPositiveInteger(1, 15),
      guests: getRandomPositiveInteger(1, 50),
      checkin: getRandomArrayElement(checkin),
      checkout: getRandomArrayElement(checkin),
      features: createFeatures(),
      description: getRandomArrayElement(description),
      photos: Array.from({ length: getRandomPositiveInteger(1, 2) }, () =>
        getRandomArrayElement(photos)
      ),
    },
    location: {
      lat: randomx,
      lng: randomy,
    },
  };
};
// Функция генерации 10-ти случайных объявлений
const getAdverts = () => Array(count).fill(null).map(() => createAdvert());

export { getAdverts };
