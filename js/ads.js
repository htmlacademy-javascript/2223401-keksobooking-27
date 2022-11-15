import {
  getAdverts
} from './data.js';

const TYPES_OF_HOUSE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const adsTemplate = document.querySelector('#card').content;
const mapAd = adsTemplate.querySelector('.popup');
const provideFeatures = (items, container) => {
  if (items) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    items.forEach((item) => {
      const element = document.createElement('li');
      element.classList.add('popup__feature');
      element.classList.add(`popup__feature--${item}`);
      fragment.append(element); // или appenСhild
    });

    container.append(fragment); // или appenСhild

  } else {
    container.classList.add('.visually-hidden');
  }
};

const providePhotos = (items, container) => {
  if (items) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    items.map((item) => {
      const element = document.createElement('img');
      element.classList.add('popup__photo');
      element.src = item;
      element.width = 45;
      element.height = 40;
      element.alt = 'Фотография жилья';
      fragment.append(element); // или appenСhild
    });

    container.append(fragment); // или appenСhild

  } else {
    container.classList.add('.visually-hidden');
  }
};

const provideAd = (element) => {
  const card = mapAd.cloneNode(true);
  card.querySelector('.popup__avatar').src = element.author.avatar;
  card.querySelector('.popup__title').textContent = element.offer.title;
  card.querySelector('.popup__text--address').textContent = element.offer.address;
  card.querySelector('.popup__text--price').textContent = `${element.offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = TYPES_OF_HOUSE[element.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${element.offer.rooms} комнаты для ${element.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;

  const featureAd = card.querySelector('.popup__features');
  provideFeatures(element.offer.features, featureAd);

  const descriptionAd = card.querySelector('.popup__description');
  descriptionAd.textContent = element.offer.description;
  if (element.offer.description.length === 0) {
    descriptionAd.classList.add('.visually-hidden');
  }

  const photoAd = card.querySelector('.popup__photos');
  providePhotos(element.offer.photos, photoAd);

  return card;
};

// Отрисовка, начиная с [0] сгенерированного DOM-элемента в блок #map-canvas
const map = document.querySelector('#map-canvas');
const adv = getAdverts();
map.append(provideAd(adv[0]));// или appendChild

export {
  provideAd
};
