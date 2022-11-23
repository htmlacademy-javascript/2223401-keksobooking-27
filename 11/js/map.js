import { adForm, activePage } from './forms.js';
import { provideAd } from './ads.js';
//import { getAdverts } from './data.js';
const COORDINATE_ROUNDING = 5;
const ZOOM_MAP = 12;

const POSITION_TOKYO = {
  lat: 35.681729,
  lng: 139.753927,
};

// Главная метка
const PIN_MAIN = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Метка для объявлений
const PIN_AD = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Open source изображение
const LeafletParameters = {
  TILE_LAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
};

// Создание изначальных координат в поле "Адрес (координаты)"
const addressForm = adForm.querySelector('#address');
const updateAddress = (location) => {
  const lat = location.lat.toFixed(COORDINATE_ROUNDING);
  const lng = location.lng.toFixed(COORDINATE_ROUNDING);
  addressForm.value = `${lat} ${lng}`;
};

// Отображение карты
const map = L.map('map-canvas')
  .on('load', () => { // инициализация карты
    updateAddress(POSITION_TOKYO);
    activePage(); // При успешной загрузке карты старница переключается в активное состояние
  }).setView(POSITION_TOKYO, ZOOM_MAP);

// добавление изображения на созданную карту
L.tileLayer(
  LeafletParameters.TILE_LAYER,
  {
    attribution: LeafletParameters.ATTRIBUTION,
  },
).addTo(map);

// Добавление метки
const mainPin = L.marker(
  POSITION_TOKYO,
  {
    draggable: true, // передвижение метки по карте
    icon: PIN_MAIN,
  },
);

mainPin.addTo(map);

// Обработчик передвижения метки по карте
mainPin.on('move', (evt) => {
  updateAddress(evt.target.getLatLng());
});

const notice = document.querySelector('.notice');
const noticeForm = notice.querySelector('.ad-form');
const resetButton = noticeForm.querySelector('button[type="reset"]');

// Возвращение метки на исходные координаты
const resetMainPin = (marker) => {
  marker.setLatLng(POSITION_TOKYO);
  map.setView(POSITION_TOKYO, ZOOM_MAP);
};

const getResetForm = () => {
  resetMainPin(mainPin);
};
// Возвращает кнопку на исходные координаты при нажатии кнопки очистить, слушатель события
resetButton.addEventListener('click', getResetForm);

// Создание метки с объявлением
const createPinAd = (ad, layer = map) => {
  const marker = L.marker(ad.location, { icon: PIN_AD });
  marker.addTo(layer).bindPopup(provideAd(ad), // привязывает балун-объявление к метке
      {
        keepInView: true, //карта автоматически перемещается, если всплывающий балун-объявление не помещается и вылезает за границы
      },
    );
  return marker;
};
/*const createPinAd = (offers) => {
 offers.forEach((offer)=> {
    const marker=L.marker(
        {
            lat:offer.location.lat,
            lng:offer.location.lng,
        },
        {
            icon: PIN_AD
        }
    );
    marker.addTo(markerGroup).bindPopup(provideAd(offer)),
  });
};
const createMarkerGroup = (offers) =>{
    markerGroup/clearLayers();
    createAdPinMarkers(offers.slice(0, OFFERS_COUNT));

};*/

/*const createMarkerGroup = getAdverts().forEach((point) => { // getAdverts Функция генерации 10-ти случайных объявлений
  const {lat, lng} = point.location;
  const marker = L.marker(
    {
      lat: point.location.lat,
      lng: point.location.lng,
    },
    {
      icon: PIN_AD,
    },
  );

  marker.addTo(map)
    .bindPopup(provideAd(point)); // привяжем к каждой нашей метке балун bindPopup(), чтобы по клику на неё показывалась информация о месте
});*/
//Создание слоя с группой меток
const createMarkerGroup = ads => {
  const markerGroup = L.layerGroup().addTo(map);
  ads.forEach((ad) => createPinAd(ad, markerGroup));
  return markerGroup;
};

export { resetMainPin, createPinAd, createMarkerGroup };
