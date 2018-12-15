'use strict';

(function () {
  var characterPopupPanel = document.querySelector('.setup');
  var similarCharacterBlock = characterPopupPanel.querySelector('.setup-similar');
  var randomCharacterList = similarCharacterBlock.querySelector('.setup-similar-list');
  var similarCharacterTemplate = document.querySelector('#similar-wizard-template');

  similarCharacterBlock.classList.remove('hidden');

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
})();
