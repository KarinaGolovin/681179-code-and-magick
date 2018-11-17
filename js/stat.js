
'use strict';

(function () {
  window.renderStatistics = function (ctx, names, times) {
    var gapX = 50;
    var gapY = 10;
    var columnWidth = 40;
    var maxColumnHeight = 150;
    var baseX = 155;
    var baseY = 90;
    var maxTime = getMaxValue(times);
    var me = 'Вы';

    // тень вылетающего окна
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
    // рамка вылетающего окна
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.strokeRect(99, 9, 422, 272);
    // окно
    ctx.fillStyle = 'white';
    ctx.fillRect(100, 10, 420, 270);
    // текст в окне
    ctx.fillStyle = 'black';
    ctx.font = '16px "PT Mono"';
    ctx.fillText('Ура вы победили!', baseX, 40, [360]);
    ctx.fillText('Список результатов:', baseX, 60, [360]);

    for (var i = 0; i < names.length; i++) {
      var randomSaturationNumber = getRandomNumber(25, 75);
      var playerTime = Math.round(times[i]);
      var playerName = names[i];

      // отношение
      var ratio = playerTime / maxTime;
      var playerColumnHeight = maxColumnHeight * ratio;

      var playerColumnY = baseY + maxColumnHeight - playerColumnHeight;
      var playerColumnX = baseX + (gapX + columnWidth) * i;

      // определяю цвет для столбцов
      if (names[i] === me) {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(240, 100%, ' + randomSaturationNumber + '%)';
      }

      ctx.fillRect(playerColumnX, playerColumnY, columnWidth, playerColumnHeight);

      ctx.fillStyle = 'black';
      ctx.textBaseline = 'middle';
      // вывод времени игроков
      ctx.fillText(playerTime, playerColumnX, playerColumnY - gapY, [50]);
      // вывод имен игроков
      ctx.fillText(shortenName(playerName, 8), playerColumnX, baseY + maxColumnHeight + gapY);
    }
  };

  // задаю максимальную длину выводимого имени
  var shortenName = function (name, maxLength) {
    return name.slice(0, maxLength);
  };

  // сортирую массив чисел и нахожу наибольшее по последнему индексу в массив
  var getMaxValue = function (arr) {
    var sortedTimes = arr.slice().sort(function (a, b) {
      return a - b;
    });

    var maxTime = sortedTimes[arr.length - 1];

    return maxTime;
  };

  // высчитываю случайный номер в диапазоне от-до
  var getRandomNumber = function (minNumber, maxNumber) {
    var randomNumber = Math.floor(minNumber + (Math.random() * (maxNumber + 1 - minNumber)));

    return randomNumber;
  };
})();
