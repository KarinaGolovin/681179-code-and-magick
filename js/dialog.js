'use strict';

(function () {
  var KEY_CODES = {
    enter: 13,
    esc: 27
  };

  var CHARACTER_COUNT = 4;

  var setupWindow = document.querySelector('.setup');
  var setupOpenButton = document.querySelector('.setup-open-icon');
  var setupCloseButton = setupWindow.querySelector('.setup-close');
  var nameInput = setupWindow.querySelector('.setup-user-name');
  var userPic = setupWindow.querySelector('.setup-user-pic');
  var picUploadButton = setupWindow.querySelector('.upload');
  var setupForm = setupWindow.querySelector('.setup-wizard-form');
  var errorPopup = document.querySelector('.popup-error');
  var errorMessage = errorPopup.querySelector('.popup-error-message');
  var errorCloseButton = errorPopup.querySelector('.popup-error-button');
  var picWidth = userPic.offsetWidth;
  var picHeight = userPic.offsetHeight;

  var generateOnErrorWizardsList = function () {
    var charactersOnErrorList = [];
    var errorCharacter = {
      colorCoat: 'rgb(101, 137, 164)',
      colorEyes: 'rgb(101, 137, 164)',
    };
    for (var i = 0; i < CHARACTER_COUNT; i++) {
      charactersOnErrorList.push(errorCharacter);
    }
    return charactersOnErrorList;
  };

  // Event Listeners
  var closePopup = function () {
    setupWindow.classList.add('hidden');
    setupWindow.classList.remove('active');
    setupWindow.style.left = '';
    setupWindow.style.top = '';
  };

  var openPopup = function () {
    setupWindow.classList.remove('hidden');
    setupWindow.classList.add('active');
    setupOpenButton.blur();

    window.characterMethods.clearCharactersContainer();

    window.backend.load(function (charactersList) {
      var randomCharacters = window.usefulUtilities.getRandomArraySlice(charactersList, CHARACTER_COUNT);
      window.characterMethods.renderCharacters(randomCharacters);
    }, function onError() {
      var fakeCharacters = generateOnErrorWizardsList();
      window.characterMethods.renderCharacters(fakeCharacters);
      document.querySelectorAll('.setup-similar-content').forEach(function (element) {
        element.classList.add('low-opacity');
      });
    });

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

  // On submit to save data
  var closeErrorOnOutClick = function (event) {
    event.preventDefault();
    if (!event.target.closest('.popup-error')) {
      closeErrorPopup();
    }
  };

  var closeErrorOnEscPress = function (event) {
    if (event.keyCode === KEY_CODES.esc) {
      event.preventDefault();
      closeErrorPopup();
    }
  };

  var closeErrorPopup = function () {
    errorPopup.classList.add('hidden');
    errorMessage.textContent = '';
    errorCloseButton.removeEventListener('click', closeErrorPopup);
    document.removeEventListener('keydown', closeErrorOnEscPress);
    document.removeEventListener('click', closeErrorOnOutClick);
    setupWindow.classList.remove('hidden');
    setupWindow.classList.add('active');
  };

  var showErrorPopup = function (message) {
    setupWindow.classList.add('hidden');
    setupWindow.classList.remove('active');
    errorMessage.textContent = 'Ошибка!' + message;
    errorPopup.classList.remove('hidden');
    document.addEventListener('keydown', closeErrorOnEscPress);
    document.addEventListener('click', closeErrorOnOutClick);
    errorCloseButton.addEventListener('click', closeErrorPopup);
  };

  setupForm.addEventListener('submit', function submitMageForm(event) {
    event.preventDefault();
    var formData = new FormData(event.currentTarget);

    window.backend.save(closePopup, showErrorPopup, formData);
  });

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

  // Drag-n-drop
  var dragHapened = false;

  picUploadButton.addEventListener('click', function (evt) {
    if (dragHapened) {
      evt.preventDefault();
      dragHapened = false;
    }
  });

  picUploadButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startPosition = {
      clientX: evt.clientX,
      clientY: evt.clientY,
      x: setupWindow.offsetLeft,
      y: setupWindow.offsetTop
    };

    var movePopup = function (moveEvt) {
      dragHapened = true;
      var deltaX = startPosition.clientX - moveEvt.clientX;
      var deltaY = startPosition.clientY - moveEvt.clientY;

      setupWindow.style.left = (startPosition.x - deltaX) + picWidth / 2 + 'px';
      setupWindow.style.top = (startPosition.y - deltaY) - picHeight / 2 + 'px';
    };

    var stopPopup = function () {
      document.removeEventListener('mousemove', movePopup);
      document.removeEventListener('mouseup', stopPopup);
    };

    document.addEventListener('mousemove', movePopup);
    document.addEventListener('mouseup', stopPopup);
  });
})();
