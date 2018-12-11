'use strict';

(function () {
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

  var wizard = document.querySelector('.setup-wizard');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var characterPopupPanel = document.querySelector('.setup');
  var similarCharacterBlock = characterPopupPanel.querySelector('.setup-similar');
  var randomCharacterList = similarCharacterBlock.querySelector('.setup-similar-list');
  var similarCharacterTemplate = document.querySelector('#similar-wizard-template');

  similarCharacterBlock.classList.remove('hidden');

  var createSequence = window.usefulUtilities.createSequence;

  // Render random character template
  var renderCharacter = function (character) {
    var characterElement = similarCharacterTemplate.content.cloneNode(true);

    var characterNameTemplate = characterElement.querySelector('.setup-similar-label');
    var characterCoatTemplate = characterElement.querySelector('.wizard-coat');
    var characterEyesTemplate = characterElement.querySelector('.wizard-eyes');

    characterNameTemplate.textContent = character.name;
    characterCoatTemplate.style.fill = character.colorCoat;
    characterEyesTemplate.style.fill = character.colorEyes;

    return characterElement;
  };

  window.characterMethods = {
    renderCharacters: function (charactersList) {
      var fragment = document.createDocumentFragment();
      charactersList.forEach(function (character) {
        var renderTemplate = renderCharacter(character);
        fragment.appendChild(renderTemplate);
        randomCharacterList.appendChild(fragment);
      });
    },
    clearCharactersContainer: function () {
      while (randomCharacterList.lastChild) {
        randomCharacterList.removeChild(randomCharacterList.lastChild);
      }
    }
  };

  // Wizard character
  var getFireballColor = createSequence(FIREBALL_COLORS);

  fireball.addEventListener('click', function () {
    var color = getFireballColor();
    fireball.style.background = color;
    document.querySelector('[name="fireball-color"]').value = color;
  });

  var getCoatColor = createSequence(COAT_COLORS);

  wizardCoat.addEventListener('click', function () {
    var color = getCoatColor();
    document.querySelector('[name="coat-color"]').value = color;
    wizardCoat.style.fill = color;
  });

  var getEyeColor = createSequence(EYES_COLORS);

  wizardEyes.addEventListener('click', function () {
    var color = getEyeColor();
    document.querySelector('[name="eyes-color"]').value = color;
    wizardEyes.style.fill = color;
  });
})();
