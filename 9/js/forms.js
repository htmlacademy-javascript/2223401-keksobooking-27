const mapFormFilters = document.querySelector('.map__filters');
const mapFormSelects = mapFormFilters.querySelectorAll('select');
const mapFormFieldset = mapFormFilters.querySelector('fieldset');
const adForm = document.querySelector('.ad-form');
const adFormFieldsets = adForm.querySelectorAll('fieldset');

// Неактивная страница
const notactivePage = () => {
  mapFormFilters.classList.add('map__filters--disabled');
  adForm.classList.add('ad-form--disabled');

  mapFormSelects.forEach((element) => {
    element.disabled = true;
  });

  mapFormFieldset.disabled = true;

  adFormFieldsets.forEach((element) => {
    element.disabled = true;
  });
};

notactivePage();

// Активная страницы
const activePage = () => {
  mapFormFilters.classList.remove('map__filters--disabled');
  adForm.classList.remove('ad-form--disabled');

  mapFormSelects.forEach((element) => {
    element.disabled = false;
  });

  mapFormFieldset.disabled = false;

  adFormFieldsets.forEach((element) => {
    element.disabled = false;
  });
};

activePage();

export { notactivePage, activePage, adForm };


