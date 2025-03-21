//Базові
// https://www.codewars.com/kata/convert-a-string-to-an-array/train/javascript

function stringToArray(string) {
  return string.split(" ");
}

//https://www.codewars.com/kata/dna-to-rna-conversion/train/javascript

function DNAtoRNA(dna) {
  return dna.replaceAll("T", "U");
}

//Поглиблені
//https://www.codewars.com/kata/577a98a6ae28071780000989/train/javascript

var min = function (list) {
  list.sort((a, b) => a - b);
  return list[0];
};

var max = function (list) {
  list.sort((a, b) => b - a);
  return list[0];
};

//https://www.codewars.com/kata/544a54fd18b8e06d240005c0/train/javascript

function min(arr, toReturn) {
  const minValue = Math.min(...arr);
  if (toReturn === "value") {
    return minValue;
  } else if (toReturn === "index") {
    return arr.indexOf(minValue);
  }
}

//Додаткові задачки по JS, щоб формувати навички, якщо маєте час і бажання
//Double Integer    https://www.codewars.com/kata/53ee5429ba190077850011d4/train/javascript

function doubleInteger(i) {
  return i * 2;
}

//Twice as old    https://www.codewars.com/kata/5b853229cfde412a470000d0/train/javascript

function twiceAsOld(dadYearsOld, sonYearsOld) {
  let result = sonYearsOld * 2 - dadYearsOld;
  return Math.abs(result);
}

//Return n-th even number    https://www.codewars.com/kata/5933a1f8552bc2750a0000ed/train/javascript

function nthEven(n) {
  return n * 2 - 2;
}

//What's the real floor     https://www.codewars.com/kata/574b3b1599d8f897470018f6/train/javascript

function getRealFloor(n) {
  if (n > 0 && n < 14) {
    return n - 1;
  } else if (n < 0) {
    return n;
  } else if (n >= 14) {
    return n - 2;
  } else {
    return 0;
  }
}

//Clock    https://www.codewars.com/kata/55f9bca8ecaa9eac7100004a/train/javascript

function past(h, m, s) {
  return s * 1000 + m * 60000 + h * 3600000;
}

//Is n divisible by x and y    https://www.codewars.com/kata/5545f109004975ea66000086/train/javascript

function isDivisible(n, x, y) {
  return n % x === 0 && n % y === 0;
}
