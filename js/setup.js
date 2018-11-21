'use strict';

var setupBlock = document.querySelector('.setup');
var makeSetupBlockVisible = setupBlock.classList.remove('hidden');

var wizardOptions = [wizardNames, wizardSurnames, coatColor, eyesColor];

var wizardName = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

var wizardSurname = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

var coatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var eyesColor = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

// create wizard with random descriptions/options
var createWizard = function (wizardOptions) {
  var wizard = {};

  for (var i = 0; i < i.length; i++) {
    var wizardKey = wizardOptions[i];

    wizard[wizardKey] = wizardKey[getRandomNumber(0, wizardKey.length)];
  }
  return wizard;
};



// var wizard = {};

// var createWizard = function () {
//   wizard.name = wizardNames[getRandomNumber(0, wizardNames.length)];
//   wizard.surname = wizardSurnames[getRandomNumber(0, wizardSurnames.length)];
//   wizard.coatColor = coatColor[getRandomNumber(0, coatColor.length)];
//   wizard.eyesColor = eyesColor[getRandomNumber(0, eyesColor.length)];
// };


// get random number in the range from...to
var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(minNumber + (Math.random() * (maxNumber + 1 - minNumber)));
};
