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

  var characterPopupPanel = document.querySelector('.setup');
  var similarCharacterBlock = characterPopupPanel.querySelector('.setup-similar');
  // place to put template list
  var randomCharacterList = similarCharacterBlock.querySelector('.setup-similar-list');
  // wizard template to clone >>> randomCharacterList
  var similarCharacterTemplate = document.querySelector('#similar-wizard-template');

  // characterPopupPanel.classList.remove('hidden');
  similarCharacterBlock.classList.remove('hidden');

  var getRandomProperty = function (props) {
    return props[window.usefulUtilities.getRandomNumber(0, props.length - 1)];
  };

  // generate random character options
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

  // ----------- Setup wizard -------------

  var setupWindow = document.querySelector('.setup');
  var setupOpenButton = document.querySelector('.setup-open-icon');
  var setupCloseButton = setupWindow.querySelector('.setup-close');
  var setupSubmitButton = setupWindow.querySelector('.setup-submit');
  var nameInput = setupWindow.querySelector('.setup-user-name');
  var wizard = setupWindow.querySelector('.setup-wizard');
  var wizardCoat = wizard.querySelector('.wizard-coat');
  var wizardEyes = wizard.querySelector('.wizard-eyes');
  var fireball = setupWindow.querySelector('.setup-fireball-wrap');

  // variation of open popup
  var openPopup = function () {
    setupWindow.classList.remove('hidden');
    setupWindow.classList.add('active');
  };

  setupOpenButton.addEventListener('click', openPopup);

  // NOT WORKING
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13 && setupOpenButton.onfocus) {
      evt.preventDefault();
      setupWindow.classList.remove('hidden');
      setupWindow.classList.add('active');
    }
  });


  setupOpenButton.addEventListener('mouseover', function () {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        evt.preventDefault();
        setupWindow.classList.remove('hidden');
        setupWindow.classList.add('active');
      }
    });
  });

  // variation of close popup
  var closePopup = function () {
    setupWindow.classList.add('hidden');
    setupWindow.classList.remove('active');
  };

  setupCloseButton.addEventListener('click', closePopup);

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (!nameInput.onfocus) {
        evt.preventDefault();
        setupWindow.classList.add('hidden');
        setupWindow.classList.remove('active');
      }
    }
  });

  // поправить, чтоб не закрывалось все окно при любом enter
  setupCloseButton.addEventListener('mouseover', function () {
    setupCloseButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        evt.preventDefault();
        setupWindow.classList.add('hidden');
        setupWindow.classList.remove('active');
      }
    });
  });

  // // NOT WORKING
  // // name area to be active in setup open moment

  // проверка валидации инпута
  var validateInput = function () {
    nameInput.addEventListener('invalid', function (evt) {
      if (nameInput.validity.tooShort) {
        nameInput.setCustomValidity('Пожалуйста, постарайтесь еще. Имя должно состоять из 2-х символов.');
      } else if (nameInput.validity.tooLong) {
        nameInput.setCustomValidity('Не-не-не! Слишком длинно! 25 символов, пожалуйста!');
      } else if (nameInput.validity.valueMissing) {
        nameInput.setCustomValidity('Ну же, всего пару буковок введи!');
      } else {
        nameInput.setCustomValidity('');
      }
    });
  };

  // send to server
  // setupSubmitButton.addEventListener('submit', function (event) {
  // event.preventDefault();
  // sendData();
  //   // отправка на сервер
  // var sendData = function () {
  //   // form.submit()
  //   // var FD = new FormData();
  //   // XHR.open('POST', 'https://js.dump.academy/code-and-magick');
  //   // XHR.setRequestHeader('Content-Type', 'multipart/form-data');
  //   // XHR.send(FD);
  // }

  // добавить в HTML
  // <form id="setupSubmit">
  // <input id="wizardName" name="name" value="(что введено в поле)"></input>
  // <button type="submit" value="Сохранить">
  // </form>

  // });

  // NOT WORKING
  if (setupWindow.classList.contains('active') && setupSubmitButton.onfocus) {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        // отправка на сервер
        setupWindow.classList.add('hidden');
        setupWindow.classList.remove('active');
      }
    }, true);
  }

  // ----- Wizard -----
  fireball.addEventListener('click', function () {
    var colorIndex = getRandomProperty(FIREBALL_COLORS);
    fireball.style.background = colorIndex;
  });

  wizardCoat.addEventListener('click', function () {
    var colorIndex = getRandomProperty(COAT_COLORS);
    wizardCoat.style.fill = colorIndex;
  });

  wizardEyes.addEventListener('click', function () {
    var colorIndex = getRandomProperty(EYES_COLORS);
    wizardEyes.style.fill = colorIndex;
  });

  // var changeColor = function (element, arr) {
  //   var colorIndex = getRandomProperty(arr);
  //   if (element === fireball) {
  //     fireball.style.background = colorIndex;
  //   } else {
  //     element.style.fill = colorIndex;
  //   }
  // };

  // wizardCoat.addEventListener('click', changeColor(wizardCoat, COAT_COLORS));
  // wizardEyes.addEventListener('click', changeColor(wizardEyes, EYES_COLORS));
  // fireball.addEventListener('click', changeColor(fireball, FIREBALL_COLORS));

})();
