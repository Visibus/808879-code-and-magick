'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BETWEEN_BAR = 50;


var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var marginLeft = parseInt((CLOUD_WIDTH - (BAR_WIDTH * 4 + BETWEEN_BAR * 3)) / 2, 10); // отступ слева
  var message = 'Ура вы победили!\nСписок результатов:'; // текст сообщения на облаке
  var messageArr = message.split('\n'); // массив, полученный разбиением строки
  var maxTime = getMaxElement(times);

  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';

  for (var i = 0; i < messageArr.length; i++) {
    ctx.fillText(messageArr[i], CLOUD_X + 2 * GAP, CLOUD_Y + 2 * GAP * (i + 1));
  }


  for (i = 0; i < players.length; i++) {
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    else {
      var saturation = Math.random(3).toFixed(3);
      ctx.fillStyle = 'rgba(0, 0, 255, ' + saturation + ')';
    }

    ctx.fillRect(CLOUD_X + marginLeft + (BAR_WIDTH + BETWEEN_BAR) * i, CLOUD_HEIGHT - (2 * GAP + FONT_GAP), BAR_WIDTH, -((BAR_HEIGHT * times[i]) / maxTime));

    ctx.fillStyle = '#000';

    ctx.fillText(Math.round(times[i]), CLOUD_X + marginLeft + (BAR_WIDTH + BETWEEN_BAR) * i, (CLOUD_HEIGHT - (3 * GAP + FONT_GAP)) - ((BAR_HEIGHT * times[i]) / maxTime));
    ctx.fillText(players[i], CLOUD_X + marginLeft + (BAR_WIDTH + BETWEEN_BAR) * i, CLOUD_HEIGHT - GAP);

  }
};
