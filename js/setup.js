'use strict';

(function () {
  var KEY_CODES = {
    enter: 13,
    esc: 27
  };
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
  var setupOpenButton = document.querySelector('.setup-open-icon');
  var setupCloseButton = setupWindow.querySelector('.setup-close');
  var setupSubmitButton = setupWindow.querySelector('.setup-submit');
  var nameInput = setupWindow.querySelector('.setup-user-name');
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

  // Event Listeners
  var closePopup = function () {
    setupWindow.classList.add('hidden');
    setupWindow.classList.remove('active');
  };

  var openPopup = function () {
    setupWindow.classList.remove('hidden');
    setupWindow.classList.add('active');
  };

  var openOnEnterPress = function (event) {
    if (event.keyCode === KEY_CODES.enter) {
      event.preventDefault();
      openPopup();
    }
  };

  var closeOnEnterPress = function (event) {
    if (event.keyCode === KEY_CODES.enter) {
      event.preventDefault();
      closePopup();
    }
  };

  // Variations of open popup
  // Click
  setupOpenButton.addEventListener('click', openPopup);

  // Focus + ENTER
  setupOpenButton.addEventListener('focus', function () {
    setupOpenButton.addEventListener('keydown', openOnEnterPress);
  });
  setupOpenButton.addEventListener('blur', function () {
    setupOpenButton.removeEventListener('keydown', openOnEnterPress);
  });

  // Variation of close popup
  // Click
  setupCloseButton.addEventListener('click', closePopup);

  // Focus + ENTER
  setupCloseButton.addEventListener('focus', function () {
    setupCloseButton.addEventListener('keydown', closeOnEnterPress);
  });
  setupCloseButton.addEventListener('blur', function () {
    setupCloseButton.removeEventListener('keydown', closeOnEnterPress);
  });

  // ESC
  document.addEventListener('keydown', function (event) {
    if (event.keyCode === KEY_CODES.esc && document.activeElement !== nameInput) {
      event.preventDefault();
      closePopup();
    }
  });

  // Validity check
  var validateNameInput = function () {
    if (nameInput.validity.tooShort) {
      nameInput.setCustomValidity('Пожалуйста, постарайтесь еще. Имя должно состоять из 2-х символов.');
    } else if (nameInput.validity.tooLong) {
      nameInput.setCustomValidity('Не-не-не! Слишком длинно! 25 символов, пожалуйста!');
    } else if (nameInput.validity.valueMissing) {
      nameInput.setCustomValidity('Ну же, всего пару буковок введи!');
    } else {
      nameInput.setCustomValidity('');
    }
  };

  nameInput.addEventListener('invalid', validateNameInput);
})();
