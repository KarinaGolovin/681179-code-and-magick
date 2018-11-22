'use strict';

var characterPopupPanel = document.querySelector('.setup');
var similarCharacterBlock = characterPopupPanel.querySelector('.setup-similar');
// place to put template list
var randomCharacterList = similarCharacterBlock.querySelector('.setup-similar-list');
// wizard template to clone >>> randomCharacterList
var similarCharacterTemplate = document.querySelector('#similar-wizard-template');

characterPopupPanel.classList.remove('hidden');
similarCharacterBlock.classList.remove('hidden');

var characterCount = 4;
var wizardNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

var wizardSurnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

var coatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var eyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

// get random number in the range from...to
var getRandomNumber = function (minNumber, maxNumber) {
  return Math.floor(minNumber + (Math.random() * (maxNumber + 1 - minNumber)));
};

// generate random character options
var createCharacter = function () {
  var randomCharacter = {
    name: wizardNames[getRandomNumber(0, wizardNames.length - 1)],
    surname: wizardSurnames[getRandomNumber(0, wizardSurnames.length - 1)],
    coatColor: coatColors[getRandomNumber(0, coatColors.length - 1)],
    eyesColor: eyesColors[getRandomNumber(0, eyesColors.length - 1)],
    fullname: function () {
      return randomCharacter.name + ' ' + randomCharacter.surname;
    }
  };
  return randomCharacter;
};

// render random character template
var renderRandomCharacter = function (character) {
  // clone template
  var characterElement = similarCharacterTemplate.content.cloneNode(true);
  // link on template wizard options
  var characterNameTemplate = characterElement.querySelector('.setup-similar-label');
  var characterCoatTemplate = characterElement.querySelector('.wizard-coat');
  var characterEyesTemplate = characterElement.querySelector('.wizard-eyes');
  // rewrite template options to random character options
  characterNameTemplate.textContent = character.fullname();
  characterCoatTemplate.style.fill = character.coatColor;
  characterEyesTemplate.style.fill = character.eyesColor;

  return characterElement;
};

// clone characters and send them to randomCharacterList
for (var i = 1; i <= characterCount; i++) {
  var randomCharacter = createCharacter();
  var renderTemplate = renderRandomCharacter(randomCharacter);
  randomCharacterList.appendChild(renderTemplate);
}
