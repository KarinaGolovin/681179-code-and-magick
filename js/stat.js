
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
    var getMaxValue = window.usefulUtilities.getMaxValue;

    // Popup shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
    // Popup border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.strokeRect(99, 9, 422, 272);
    // Popup
    ctx.fillStyle = 'white';
    ctx.fillRect(100, 10, 420, 270);
    // Popup text
    ctx.fillStyle = 'black';
    ctx.font = '16px "PT Mono"';
    ctx.fillText('Ура вы победили!', baseX, 40, [360]);
    ctx.fillText('Список результатов:', baseX, 60, [360]);

    for (var i = 0; i < names.length; i++) {
      var saturation = window.usefulUtilities.getRandomNumber(25, 75);
      var playerTime = Math.round(times[i]);
      var playerName = names[i];

      // Ratio
      var ratio = playerTime / maxTime;
      var playerColumnHeight = maxColumnHeight * ratio;

      var playerColumnY = baseY + maxColumnHeight - playerColumnHeight;
      var playerColumnX = baseX + (gapX + columnWidth) * i;

      // Score line color
      if (playerName === me) {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = 'hsl(240, 100%, ' + saturation + '%)';
      }

      ctx.fillRect(playerColumnX, playerColumnY, columnWidth, playerColumnHeight);

      ctx.fillStyle = 'black';
      ctx.textBaseline = 'middle';
      // Show players time
      ctx.fillText(playerTime, playerColumnX, playerColumnY - gapY, [50]);
      // Show players names
      ctx.fillText(shortenName(playerName, 8), playerColumnX, baseY + maxColumnHeight + gapY);
    }
  };

  // Max name length
  var shortenName = function (name, maxLength) {
    return name.slice(0, maxLength);
  };
})();
