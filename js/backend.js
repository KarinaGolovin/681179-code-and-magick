'use strict';

(function () {
  var load = function (config) {
    var url = config.url;
    var onSuccess = config.onSuccess;
    var onError = config.onError;
    var method = config.method;
    var data = config.data;

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000;

    xhr.open(method, url);
    xhr.send(data);
  };

  var responseCache = {};

  window.backend = {
    save: function (onLoad, onError, data) {
      load({
        url: 'https://js.dump.academy/code-and-magick',
        onSuccess: onLoad,
        onError: onError,
        method: 'POST',
        data: data
      });
    },
    load: function (onLoad, onError, allowCached) {
      var url = 'https://js.dump.academy/code-and-magick/data';

      if (allowCached && responseCache[url]) {
        onLoad(responseCache[url]);
        return;
      }

      load({
        url: url,
        onSuccess: function (response) {
          responseCache[url] = response;
          onLoad(response);
        },
        onError: onError,
        method: 'GET'
      });
    }
  };
})();


