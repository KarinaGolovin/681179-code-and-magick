'use strict';

window.usefulUtilities = {
  getRandomNumber: function (minNumber, maxNumber) {
    return Math.floor(minNumber + (Math.random() * (maxNumber + 1 - minNumber)));
  },
  getMaxValue: function (arr) {
    var maxValue = arr[0];

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > maxValue) {
        maxValue = arr[i];
      }
    }

    return maxValue;
  },
  createSequence: function (arr) {
    var currentIndex = 0;

    return function () {
      return arr[++currentIndex % arr.length];
    };
  },
  getRandomArraySlice: function (arr, count) {
    if (arr.length < count) {
      return arr;
    }

    var clone = [].concat(arr);
    var arrSlice = [];

    while (count--) {
      var randomIndex = this.getRandomNumber(0, clone.length - 1);
      arrSlice.push(clone.splice(randomIndex, 1)[0]);
    }

    return arrSlice;
  }
};
