'use strict';

(function () {
  var artifact = document.querySelector('.star');
  var artifactsSetup = document.querySelector('.setup-artifacts');

  var removeShadow = function (event) {
    var parentElement = event.currentTarget;

    if (parentElement.classList.contains('over')) {
      parentElement.classList.remove('over');
    }
  };

  var drop = false;
  var draggedElement = null;

  document.addEventListener('dragstart', function (event) {
    drop = false;
    if (event.target.classList.contains('star')) {
      draggedElement = event.target;
      event.target.style.opacity = '0';
    }
  });

  artifactsSetup.addEventListener('dragover', function (event) {
    event.preventDefault();
    artifactsSetup.classList.add('over');
    event.target.classList.add('highlight');
  });

  artifactsSetup.addEventListener('dragleave', function (event) {
    var element = event.target;

    if (element.classList.contains('highlight')) {
      element.classList.remove('highlight');
    }

    removeShadow(event);
  });

  var handleDragEnd = function (event) {
    artifactsSetup.classList.remove('over');
    draggedElement = null;
    if (!drop) {
      event.target.style.opacity = '1';
    }
  };

  artifactsSetup.addEventListener('drop', function (event) {
    if (draggedElement === event.target) {
      handleDragEnd(event);
      return;
    }

    event.preventDefault();
    drop = true;

    var artifactClone = artifact.cloneNode(true);
    artifactClone.style.opacity = '1';
    artifact.parentElement.removeChild(artifact);
    event.target.appendChild(artifactClone);
    artifact = artifactClone;

    artifact.parentElement.classList.remove('highlight');
    removeShadow(event);
  });

  artifact.addEventListener('dragend', handleDragEnd);
})();
