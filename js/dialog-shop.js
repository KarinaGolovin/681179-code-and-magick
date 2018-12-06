'use strict';

(function () {
  var artifact = document.querySelector('.star');
  var artifactsSetup = document.querySelector('.setup-artifacts');
  // var artifactCells = artifactsSetup.querySelectorAll('setup-artifacts-cell');

  var removeShadow = function (event) {
    var parentElement = event.currentTarget;

    if (parentElement.classList.contains('over')) {
      parentElement.classList.remove('over');
    }
  };

  var drop = false;

  artifact.addEventListener('dragstart', function (event) {
    event.dataTransfer.setData('text/plain', event.target.src);
    artifact.style.opacity = '0';
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


  artifactsSetup.addEventListener('drop', function (event) {
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

  artifact.addEventListener('dragend', function () {
    artifactsSetup.classList.remove('over');

    if (drop === false) {
      artifact.style.opacity = '1';
    }
  });
})();
