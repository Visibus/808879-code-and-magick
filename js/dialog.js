// модуль формы настройки волшебника, настройка событий и поведения
'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userDialogSetupUserName = userDialog.querySelector('.setup-user-name');
  // DOM-объект (цвет мантии)
  var userDialogWizardCoat = userDialog.querySelector('.setup-wizard').querySelector('.wizard-coat');
  // DOM-объект (цвет глаз)
  var userDialogWizardEyes = userDialog.querySelector('.setup-wizard').querySelector('.wizard-eyes');
  // DOM-объект (цвет фаербола)
  var userDialogFireball = userDialog.querySelector('.setup-fireball-wrap');

  // ф-ция, которая вызывается в обработчике по нажатию ESC
  var onPopupEscPress = function (evt) {
    if ((evt.keyCode === ESC_KEYCODE) && (userDialogSetupUserName !== document.activeElement)) {
      closePopup();
    }
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });

  userDialogClose.addEventListener('click', function () {
    closePopup();
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });

  userDialogWizardCoat.addEventListener('click', function () {
    var rand = window.setup.randomElement(window.setup.coatColor);
    userDialogWizardCoat.style.fill = rand;
    document.getElementsByName('coat-color')[0].value = rand;
  });


  userDialogWizardEyes.addEventListener('click', function () {
    var rand = window.setup.randomElement(window.setup.eyesColor);
    userDialogWizardEyes.style.fill = rand;
    document.getElementsByName('eyes-color')[0].value = rand;
  });

  userDialogFireball.addEventListener('click', function () {
    var rand = window.setup.randomElement(window.setup.fireballColor);
    userDialogFireball.querySelector('input').value = rand;
    userDialogFireball.style.background = rand;
  });

  // var setupDialogElement = document.querySelector('.setup');
  var userDialogHandler = userDialog.querySelector('.upload');

  userDialogHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evtDr) {
          evtDr.preventDefault();
          userDialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        userDialogHandler.addEventListener('click', onClickPreventDefault);
      }

    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var formUserDialog = userDialog.querySelector('.setup-wizard-form');
  formUserDialog.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(formUserDialog), successHandler, errorHandler);
    evt.preventDefault();
  });

  var successHandler = function () {
    userDialog.classList.add('hidden');
    var errorElem = document.querySelector('.error');
    document.removeChild(errorElem);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterBegin', node);
  };
})();
