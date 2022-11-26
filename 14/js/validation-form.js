import {
  mainPin,
  map,
  CENTER_TOKYO,
  ZOOM_MAP
} from './map.js';

import {
  sendData
} from './server.js';

import {
  showSuccessModal,
  showErrorModal
} from './popup.js';

// минимальная цена от типа жилья
const MIN_PRICE_OF_TYPE = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};
// Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом
// задаем зависимости сколько
const roomsToGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
};
const guestsToRooms = {
  0: ['100'],
  1: ['1', '2', '3'],
  2: ['1', '2'],
  3: ['3'],
};

const COORDINATE_ROUNDING = 5;
const filterForm = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
// Переменная элемента количества мест, которая находится в форме и имеет соответствующее name
const capacityElement = adForm.querySelector('#capacity');
// Переменная элемента количества комнат, которая находится в форме и имеет соответствующее name
const roomNumberElement = adForm.querySelector('#room_number');
// Переменная тип жилья
const typeForm = adForm.querySelector('#type');
//Переменная цена
const priceForm = adForm.querySelector('#price');
const timeinForm = adForm.querySelector('#timein');
//Переменная время выезда
const timeOutForm = adForm.querySelector('#timeout');
const addressForm = adForm.querySelector('#address');
const resetButton = adForm.querySelector('.ad-form__reset');
const sliderForm = adForm.querySelector('.ad-form__slider');
const SliderConfig = {
  MIN: 0,
  MAX: 100000,
  START: priceForm.placeholder,
  STEP: 1,
};
// Пристин, присваиваем классы
const pristine = new Pristine(
  adForm,
  {
    classTo: 'ad-form__element',
    errorClass: 'ad-form__element--invalid',
    errorTextParent: 'ad-form__element',
  },
  true
);
noUiSlider.create(sliderForm, {
  range: {
    min: SliderConfig.MIN,
    max: SliderConfig.MAX,
  },
  start: SliderConfig.START,
  step: SliderConfig.STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    form: function(value) {
      return value;
    },
    from: function(value) {
      return parseFloat(value);
    },
  },
});
sliderForm.noUiSlider.on('update', () => {
  priceForm.value = sliderForm.noUiSlider.get();
});
// Валидация количества мест
const validateCapacity = () =>
  roomsToGuests[roomNumberElement.value].includes(capacityElement.value);
// Ошибки при несоответствии количества мест и количества комнат и наоборот
const getCapacityErrorMessage = () =>
  `Указанное количество комнат вмещает ${roomsToGuests[roomNumberElement.value].join(' или ')} гостей.`;
const getRoomNumberErrorMessage = () =>
  `Указанное количество гостей требует ${guestsToRooms[capacityElement.value].join(' или ')} комнаты.`;
// Изменение количества мест, к чему приводит в измение числа комнат и наоборот
const onCapacityChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
};

const onRoomNumberChange = () => {
  pristine.validate(capacityElement);
  pristine.validate(roomNumberElement);
};

// Пристин отработка валидации
pristine.addValidator(
  capacityElement,
  validateCapacity,
  getCapacityErrorMessage
);

pristine.addValidator(
  roomNumberElement,
  validateCapacity,
  getRoomNumberErrorMessage
);
// Поле Тип жилья влияет на значение поля Цена за ночь
const getTypeChange = () => {
  priceForm.placeholder = MIN_PRICE_OF_TYPE[typeForm.value];
  priceForm.min = MIN_PRICE_OF_TYPE[typeForm.value];
};
// Извещения об указании допустимой цены в поле «Цена за ночь»
const getPriceChange = (evt) => {
  const target = evt.target;
  if (target.validity.rangeUnderflow) {
    priceForm.setCustomValidity(`Укажите стоимость не ниже ${target.min}`);
  } else if (target.validity.rangeOverflow) {
    priceForm.setCustomValidity(`Укажите стоимость не выше ${target.max}`);
  } else if (target.validity.valueMissing) {
    priceForm.setCustomValidity('Обязательное поле для заполнения!');
  } else {
    priceForm.setCustomValidity('');
  }
  priceForm.reportValidity();
};

// Поле «Время заезда» синхронизированно изменят значение «Время выезда»
const getTimeInChange = () => {
  timeinForm.value = timeOutForm.value;
};

// Поле «Время выезда» синхронизированно изменят значение «Время заезда»
const getTimeOutChange = () => {
  timeOutForm.value = timeinForm.value;
};

// События которые происходят с элементами формы
capacityElement.addEventListener('change', onCapacityChange);
roomNumberElement.addEventListener('change', onRoomNumberChange);
typeForm.addEventListener('change', getTypeChange);
priceForm.addEventListener('input', getPriceChange);
timeinForm.addEventListener('change', getTimeOutChange);
timeOutForm.addEventListener('change', getTimeInChange);
//Проверка валидации перед отправкой формы
adForm.addEventListener('submit', (event) => {
  if(!pristine.validate()) {
    pristine.getErrors();
    event.preventDefault();
  }
});
// Передача координат главной метки в поле "Адрес (координаты)"
addressForm.readOnly = true;
const getAddressCoordinates = (marker) => {
  const lat = marker.getLatLng().lat.toFixed(COORDINATE_ROUNDING);
  const lng = marker.getLatLng().lng.toFixed(COORDINATE_ROUNDING);
  addressForm.value = `${lat} ${lng}`;
};
// Получение изначальное значение поля с координатами центра Токио
getAddressCoordinates(mainPin);

// Определение координат при передвижения метки по карте
mainPin.on('move', (evt) => {
  getAddressCoordinates(evt.target);
});

// Форма и карта переходят в изначальное состояние
const onResetForm = () => {
  adForm.reset();
  filterForm.reset();
  const pricePlaceholder = '1000';
  priceForm.placeholder = pricePlaceholder;
  mainPin.setLatLng(
    CENTER_TOKYO,
  );
  map.setView(
    CENTER_TOKYO,
    ZOOM_MAP);
  getAddressCoordinates(mainPin);
};

// Нажатие на кнопку "очистить" (reset-форма)
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  onResetForm();
});

// Отправить объявления по кнопке "опубликовать" (submit-форма)
adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(() => {
    showSuccessModal();
    onResetForm();
  }, showErrorModal, formData);
});

