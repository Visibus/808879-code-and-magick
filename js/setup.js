// модуль отрисовки похожих волшебников
'use strict';

(function () {
  // экспортируемый из модуля объект
  window.setup = {
    wizardNames: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    wizardSurnames: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    coatColor: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    eyesColor: ['black', 'red', 'blue', 'yellow', 'green'],
    fireballColor: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    randomElement: function (array) {
      var rand = Math.floor(Math.random() * array.length);
      return array[rand];
    }
  };
  var wizards = [];

  // функция создания DOM-элемента на основе JS-объекта
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };

  // создание массива объектов, которые описывают похожих персонажей
  for (var i = 0; i <= 3; i++) {
    wizards.push({
      name: window.setup.randomElement(window.setup.wizardNames) + ' ' + window.setup.randomElement(window.setup.wizardNames),
      coatColor: window.setup.randomElement(window.setup.coatColor),
      eyesColor: window.setup.randomElement(window.setup.eyesColor)});
  }


  // блок, куда будут вставлены объекты (похожие персонажи - wizards)
  var userDialog = document.querySelector('.setup');
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
})();
