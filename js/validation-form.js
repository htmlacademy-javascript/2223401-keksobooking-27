import {
  adForm
} from './forms.js';

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
const maxPrice = 100000;
// Переменная элемента количества мест, которая находится в форме и имеет соответствующее name
const capacityElement = adForm.querySelector('#capacity');
// Переменная элемента количества комнат, которая находится в форме и имеет соответствующее name
const roomNumberElement = adForm.querySelector('#room_number');
// Переменная тип жилья
const typeForm = adForm.querySelector('#type');
//Переменная цена
const priceForm = adForm.querySelector('#price');
//Переменная время заезда
const timeinForm = adForm.querySelector('#timein');
//Переменная время выезда
const timeOutForm = adForm.querySelector('#timeout');

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
const getPriceChange = () => {
  const price = priceForm.value;
  const type = typeForm.value;
  const minPrice = MIN_PRICE_OF_TYPE[type];

  if (price < minPrice) {
    priceForm.setCustomValidity(`Стоимость должна быть не ниже ${minPrice}`);
  } else if (price > maxPrice) {
    priceForm.setCustomValidity(`Стоимость должна быть не выше ${maxPrice}`);
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
export {
  getTypeChange,
  getPriceChange,
  getTimeInChange,
  getTimeOutChange,
  onCapacityChange,
  onRoomNumberChange,
};
