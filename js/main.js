function getRandomIntInclusive(min, max) {
    min=Math.ceil(min);
    max=Math.floor(max);
    return Math.floor(Math.random()*(max-min+1))+min; //Максимум и минимум включаются
  }
 // Функция 2.2
 function getRandomArbitrary(min, max, maxDigits=0) {
    if (min>max || min<0 || max<=0) {
      return ('Задан неверный диапазон! Укажите другие числа.');
    }
    const digitsDegree=10**maxDigits;
    return ~~((Math.random()*(max - min)+min)*digitsDegree) / digitsDegree;
  }
  getRandomIntInclusive(
    2,
    6,
  );
  getRandomArbitrary(
    2,
    6,
    0,
  );
  