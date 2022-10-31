const avatars_count = 10;
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
const location = [
  'lat',
  'lng',
];
// Функции нахождения случайных элементов 
const getRandomPositiveInteger = (a, b) => {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
function getRandomPositiveFloat(a, b, digits = 1) {
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
// Фугкция создания ссылки на изображение (аватарку)
const createAuthor = () => {
  if (getRandomPositiveInteger(1, avatars_count) < avatars_count) {
    return `img/avatars/users0${getRandomPositiveInteger(1, avatars_count)}.png`;
  }
  return {
    avatar: `img/avatars/users${getRandomPositiveInteger(1, avatars_count)}.png`,
  }
};
const createFeatures = () =>
  Array.from({ length: getRandomPositiveInteger(1, 2, 3, 4, 5, 6) }, () =>
    getRandomArrayElement(features)
  ).join('');
// Функция создания одного объявления
const createAdvert = () => {
  const lat_x = getRandomPositiveFloat(48.00000, 36.56000, 6);
  const lng_y = getRandomPositiveFloat(54.00000, 39.48000, 6);
  return {
    author: {
      avatar: createAuthor(),
    },
    offer: {
      title: getRandomArrayElement(title),
      address: `${lat_x}, ${lng_y}`,
      price: getRandomPositiveInteger(1000, 100000000),
      type: getRandomArrayElement(type),
      rooms: getRandomPositiveInteger(1, 15),
      guests: getRandomPositiveInteger(1, 50),
      checkin: getRandomArrayElement(checkin),
      checkout: getRandomArrayElement(checkin),
      features: createFeatures(),
      description: getRandomArrayElement(description),
      photos: Array.from({ length: getRandomPositiveInteger(0, 3) },
        (_, photoIndex) => createPhotos(photoIndex + 1)),
    },
    location: {
      lat: lat_x,
      lng: lng_y,
    },
  };
};

// Функция генерации 10-ти случайных объявлений
const getAdverts = () =>
  Array.from({ length: avatars_count }, (_, advertIndex) =>
    createAdvert(advertIndex + 1)
  );
getAdverts();