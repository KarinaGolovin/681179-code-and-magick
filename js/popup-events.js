'use strict';

(function () {
  var KEY_CODES = {
    enter: 13,
    esc: 27
  };
  // 2 places!!!
  var setupWindow = document.querySelector('.setup');
  var setupOpenButton = document.querySelector('.setup-open-icon');
  var setupCloseButton = setupWindow.querySelector('.setup-close');
  var nameInput = setupWindow.querySelector('.setup-user-name');
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

