'use strict';

window.usefulUtilities = {
  // Пet random number in the range from...to
  getRandomNumber: function (minNumber, maxNumber) {
    return Math.floor(minNumber + (Math.random() * (maxNumber + 1 - minNumber)));
  },
  // Sort and find highest number
  getMaxValue: function (arr) {
    var maxValue = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxValue = arr[i];
      }
    }

    return maxValue;
  }
};
