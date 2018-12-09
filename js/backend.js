'use strict';

(function () {
  window.backend = {
    save: function (onLoad, onError, data) {
      // Создаю запрос
      var saveRequest = new XMLHttpRequest();
      // ответ храниться в responseText, в текстовом формате, преобразую его в данные JSON
      saveRequest.responseType = 'json';

      // Прослушиваю ответ
      saveRequest.addEventListener('load', onLoad(saveRequest));
      // Прослушиваю ошибки
      saveRequest.addEventListener('error', onError('Произошла ошибка соединения'));

      // Открываю запрс на сервер
      saveRequest.open('POST', 'https://js.dump.academy/code-and-magick', true);
      // Отправляю запрос
      saveRequest.send(data);
    },
    load: function (onLoad, onError) {
      var getRequest = new XMLHttpRequest();

      getRequest.responseType = 'json';

      getRequest.open('GET', ' https://js.dump.academy/code-and-magick/data', true);

      getRequest.onload = onLoad();
      getRequest.onerror = onError('Произошла ошибка соединения');

      getRequest.send();
    }
  };
})();

(function () {
  var onLoad = function (request, onError, onSuccess) {
    console.log(evt.target === request);
    console.log(request.response);
    console.log(request.status + ' ' + request.statusText);

    if (request.status === 200) {
      onSuccess(request.response);
    } else {
      onError('Cтатус ответа: ' + request.status + ' ' + request.statusText);
    }
  };

  // // если приходит ошибка, чтоб ее поймать
  // try {
  //   // ответ храниться в responseText, в текстовом формате, преобразую его в данные
  //   var requestAnswer = JSON.parse(request.responseText);
  //   console.log(requestAnswer);
  // } catch (err) {
  //   console.log(err.message);
  // }

  var onError = function (message) {
    console.log(message);
  };

  var onSuccess = function (data) {
    console.log(data);
  };
})();


