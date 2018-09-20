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
})();
