
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

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.strokeRect(99, 9, 422, 272);
    ctx.fillStyle = 'white';
    ctx.fillRect(100, 10, 420, 270);
    ctx.fillStyle = 'black';
    ctx.font = '16px "PT Mono"';
    ctx.fillText('Ура вы победили!', baseX, 40, [360]);
    ctx.fillText('Список результатов:', baseX, 60, [360]);

    for (var i = 0; i < names.length; i++) {
      var randomSaturationNumber = Math.floor(Math.random() * 100);
      var playerTime = Math.round(times[i]);
      var playerName = names[i];

      var ratio = playerTime / maxTime;
      var playerColumnHeight = maxColumnHeight * ratio;

      var playerColumnY = baseY + maxColumnHeight - playerColumnHeight;

      ctx.fontStyle = 'black';
      ctx.textBaseline = 'middle';
      ctx.fillText(playerTime, baseX + (gapX + columnWidth) * i, playerColumnY - gapY, [50]);
      ctx.fillText(playerName, baseX + (gapX + columnWidth) * i, baseY + maxColumnHeight + gapY);

      if (names[i] === me) {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(240, 100%, ' + randomSaturationNumber + '%)';
      }

      ctx.fillRect(baseX + (gapX + columnWidth) * i, playerColumnY, columnWidth, playerColumnHeight);
    }
  };

  var getMaxValue = function (arr) {
    // сортирую массив чисел и нахожу наибольшее по последнему индексу в массив
    var sortedTimes = arr.slice().sort();
    var maxTime = sortedTimes[arr.length - 1];

    return maxTime;
  };
})();
