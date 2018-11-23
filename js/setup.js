'use strict';

(function () {
  var characterPopupPanel = document.querySelector('.setup');
  var similarCharacterBlock = characterPopupPanel.querySelector('.setup-similar');
  // place to put template list
  var randomCharacterList = similarCharacterBlock.querySelector('.setup-similar-list');
  // wizard template to clone >>> randomCharacterList
  var similarCharacterTemplate = document.querySelector('#similar-wizard-template');

  characterPopupPanel.classList.remove('hidden');
  similarCharacterBlock.classList.remove('hidden');

  var CHARACTER_COUNT = 4;
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

  var getRandomProperty = function (props) {
    return props[usefulUtilities.getRandomNumber(0, props.length - 1)];
  };

  // generate random character options
  var createRandomCharacter = function () {
    return {
      name: getRandomProperty(wizardNames),
      surname: getRandomProperty(wizardSurnames),
      coatColor: getRandomProperty(coatColors),
      eyesColor: getRandomProperty(eyesColors),
      getFullname: function () {
        return this.name + ' ' + this.surname;
      }
    };
  };

  // render random character template
  var renderCharacter = function (character) {
    // clone template
    var characterElement = similarCharacterTemplate.content.cloneNode(true);
    // link on template wizard options
    var characterNameTemplate = characterElement.querySelector('.setup-similar-label');
    var characterCoatTemplate = characterElement.querySelector('.wizard-coat');
    var characterEyesTemplate = characterElement.querySelector('.wizard-eyes');
    // rewrite template options on random character options
    characterNameTemplate.textContent = character.getFullname();
    characterCoatTemplate.style.fill = character.coatColor;
    characterEyesTemplate.style.fill = character.eyesColor;

    return characterElement;
  };

  // create fragment to hold all characters before append to randomCharacterList
  var fragment = document.createDocumentFragment();
  // clone characters and send them to randomCharacterList
  for (var i = 1; i <= CHARACTER_COUNT; i++) {
    var randomCharacter = createRandomCharacter();
    var renderTemplate = renderCharacter(randomCharacter);
    fragment.appendChild(renderTemplate);
  }
  randomCharacterList.appendChild(fragment);
})();
