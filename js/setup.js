'use strict';

(function () {
  var CHARACTER_COUNT = 4;
  var WIZARD_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон',
  ];

  var WIZARD_SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг',
  ];

  var COAT_COLORS = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)',
  ];

  var EYES_COLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green',
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ];

  var setupWindow = document.querySelector('.setup');
  var wizard = setupWindow.querySelector('.setup-wizard');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var fireball = setupWindow.querySelector('.setup-fireball-wrap');
  var characterPopupPanel = document.querySelector('.setup');
  var similarCharacterBlock = characterPopupPanel.querySelector('.setup-similar');
  // Place to put template list
  var randomCharacterList = similarCharacterBlock.querySelector('.setup-similar-list');
  // wizard template to clone in randomCharacterList
  var similarCharacterTemplate = document.querySelector('#similar-wizard-template');

  similarCharacterBlock.classList.remove('hidden');

  var getRandomProperty = function (props) {
    return props[window.usefulUtilities.getRandomNumber(0, props.length - 1)];
  };

  // Generate random character options
  var createRandomCharacter = function () {
    return {
      name: getRandomProperty(WIZARD_NAMES),
      surname: getRandomProperty(WIZARD_SURNAMES),
      coatColor: getRandomProperty(COAT_COLORS),
      eyesColor: getRandomProperty(EYES_COLORS),
      getFullname: function () {
        return this.name + ' ' + this.surname;
      }
    };
  };

  // Render random character template
  var renderCharacter = function (character) {
    // Clone template
    var characterElement = similarCharacterTemplate.content.cloneNode(true);
    // Link on template wizard options
    var characterNameTemplate = characterElement.querySelector('.setup-similar-label');
    var characterCoatTemplate = characterElement.querySelector('.wizard-coat');
    var characterEyesTemplate = characterElement.querySelector('.wizard-eyes');
    // Rewrite template options on random character options
    characterNameTemplate.textContent = character.getFullname();
    characterCoatTemplate.style.fill = character.coatColor;
    characterEyesTemplate.style.fill = character.eyesColor;

    return characterElement;
  };

  // Create fragment to hold all characters before append to randomCharacterList
  var fragment = document.createDocumentFragment();
  // Clone characters and send them to randomCharacterList
  for (var i = 1; i <= CHARACTER_COUNT; i++) {
    var randomCharacter = createRandomCharacter();
    var renderTemplate = renderCharacter(randomCharacter);
    fragment.appendChild(renderTemplate);
  }
  randomCharacterList.appendChild(fragment);

  // Wizard character
  fireball.addEventListener('click', function () {
    var color = getRandomProperty(FIREBALL_COLORS);
    fireball.style.background = color;
    document.querySelector('[name="fireball-color"]').value = color;
  });

  wizardCoat.addEventListener('click', function () {
    var color = getRandomProperty(COAT_COLORS);
    document.querySelector('[name="coat-color"]').value = color;
    wizardCoat.style.fill = color;
  });

  wizardEyes.addEventListener('click', function () {
    var color = getRandomProperty(EYES_COLORS);
    document.querySelector('[name="eyes-color"]').value = color;
    wizardEyes.style.fill = color;
  });
})();
