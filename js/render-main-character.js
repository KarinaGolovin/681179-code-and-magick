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
  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoat = wizardElement.querySelector('.wizard-coat');
  var wizardEyes = wizardElement.querySelector('.wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');

  if (!window.renderMainCharacter) {
    window.renderMainCharacter = {};
  }

  window.renderMainCharacter.settings = {
    colorCoat: '',
    colorEyes: ''
  };

  var createSequence = window.usefulUtilities.createSequence;
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
    window.renderMainCharacter.settings.colorCoat = color;
    renderSimilarWizardsDebounced();
  });
  var getEyeColor = createSequence(EYES_COLORS);
  wizardEyes.addEventListener('click', function () {
    var color = getEyeColor();
    document.querySelector('[name="eyes-color"]').value = color;
    wizardEyes.style.fill = color;
    window.renderMainCharacter.settings.colorEyes = color;
    renderSimilarWizardsDebounced();
  });

  // Find and render similar wizardsß
  var rankPoints = {
    colorCoat: 200,
    colorEyes: 100
  };

  var getRank = function (element) {
    var rank = 0;

    var colorCoat = window.renderMainCharacter.settings.colorCoat;
    var colorEyes = window.renderMainCharacter.settings.colorEyes;

    if (element.colorCoat === colorCoat) {
      rank += rankPoints.colorCoat;
    }

    if (element.colorEyes === colorEyes) {
      rank += rankPoints.colorEyes;
    }

    return rank;
  };
  var filterUniqueLooks = function (arr) {
    var wizardsLooks = {};
    var result = [];
    arr.forEach(function (wizard) {
      var lookKey = wizard.colorCoat + '_' + wizard.colorEyes;
      if (wizardsLooks[lookKey]) {
        return;
      }
      wizardsLooks[lookKey] = true;
      result.push(wizard);
    });

    return result;
  };

  var sortByLook = function (wizards) {
    return [].concat(wizards).sort(function (right, left) {
      var rankDiff = getRank(left) - getRank(right);
      if (rankDiff === 0) {
        rankDiff = right.name.localeCompare(left.name);
      }
      return rankDiff;
    });
  };

  var renderSimilarWizards = function () {
    var allowCachedResult = true;
    window.backend.load(function (wizards) {
      var uniqueWizards = filterUniqueLooks(wizards);
      var sortedByLook = sortByLook(uniqueWizards);
      window.characterMethods.clearCharactersContainer();
      window.characterMethods.renderCharacters(sortedByLook.slice(0, 4));
    }, function onError() {}, allowCachedResult);
  };

  var renderSimilarWizardsDebounced = window.usefulUtilities.debounce(renderSimilarWizards, 200);
})();
