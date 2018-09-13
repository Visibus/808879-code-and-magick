'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColor = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizards = [];

// функция создания DOM-элемента на основе JS-объекта
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

// функция генерации случайного элемента из заданного массива
function randomElement(array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
}

// создание массива объектов, которые описывают похожих персонажей
for (var i = 0; i <= 3; i++) {
  wizards.push({
    name: randomElement(wizardNames) + ' ' + randomElement(wizardSurnames),
    coatColor: randomElement(coatColor),
    eyesColor: randomElement(eyesColor)});
}

// удаление класса hidden
var userDialog = document.querySelector('.setup');
// userDialog.classList.remove('hidden');

// блок, куда будут вставлены объекты (похожие персонажи - wizards)
var similarListElement = userDialog.querySelector('.setup-similar-list');

// блок из шаблона, на основе которого будут добавлены элементы
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// отрисовка DOM-объектов через DocumentFragment
var fragment = document.createDocumentFragment();

for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// показываем созданный блок
userDialog.querySelector('.setup-similar').classList.remove('hidden');

var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userDialogSetupUserName = userDialog.querySelector('.setup-user-name');
// DOM-объект (цвет мантии)
var userDialogWizardCoat = userDialog.querySelector('.setup-wizard').querySelector('.wizard-coat');
// DOM-объект (цвет глаз)
var userDialogWizardEyes = userDialog.querySelector('.setup-wizard').querySelector('.wizard-eyes');
// DOM-объект (цвет фаербола)
var userDialogFireball = userDialog.querySelector('.setup-fireball-wrap');
// DOM-объект со скрытыми INPUT для цвета мантии и цвета глаз
var userDialogAppearance = userDialog.querySelector('.setup-wizard-appearance');

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
  userDialogWizardCoat.style.fill = randomElement(coatColor);
  userDialogAppearance.querySelectorAll('input')[0].value = userDialogWizardCoat.style.fill;
});


userDialogWizardEyes.addEventListener('click', function () {
  userDialogWizardEyes.style.fill = randomElement(eyesColor);
  userDialogAppearance.querySelectorAll('input')[1].value = userDialogWizardEyes.style.fill;
});

userDialogFireball.addEventListener('click', function () {
  userDialogFireball.querySelector('input').value = randomElement(fireballColor);
  userDialogFireball.style.background = userDialogFireball.querySelector('input').value;

});

// userDialog.addEventListener('submit', function () {
//   userDialogFireball.style.background = randomElement(fireballColor);
//   userDialogFireball.querySelector('input').value = userDialogFireball.background;
// });
