'use strict';

require('vtk.js/Sources/favicon');

var _Actor = require('vtk.js/Sources/Rendering/Core/Actor');

var _Actor2 = _interopRequireDefault(_Actor);

var _FullScreenRenderWindow = require('vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow');

var _FullScreenRenderWindow2 = _interopRequireDefault(_FullScreenRenderWindow);

var _Mapper = require('vtk.js/Sources/Rendering/Core/Mapper');

var _Mapper2 = _interopRequireDefault(_Mapper);

var _PolyDataReader = require('vtk.js/Sources/IO/Legacy/PolyDataReader');

var _PolyDataReader2 = _interopRequireDefault(_PolyDataReader);

var _HttpDataAccessHelper = require('vtk.js/Sources/IO/Core/DataAccessHelper/HttpDataAccessHelper');

var _HttpDataAccessHelper2 = _interopRequireDefault(_HttpDataAccessHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileName = 'sphere.vtk'; // 'uh60.vtk'; // 'luggaBody.vtk';

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

/*const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance();
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();

const resetCamera = renderer.resetCamera;
const render = renderWindow.render;*/

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

/*const reader = vtkPolyDataReader.newInstance();*/

var fileInput = document.getElementById("fileInput");

function handleFile(e) {
    console.log(e);
    preventDefaults(e);
    var dataTransfer = e.dataTransfer;
    var files = e.target.files || dataTransfer.files;
    if (files.length > 0) {
        load(myContainer, { files: files });
    }
}

fileInput.addEventListener('change', handleFile);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function load(container, options) {
    autoInit = false;
    emptyContainer(container);

    if (options.files) {
        createViewer(container);
        var count = options.files.length;
        while (count--) {
            loadFile(options.files[count]);
        }
        updateCamera(renderer.getActiveCamera());
    } else if (options.fileURL) {
        (function () {
            var urls = [].concat(options.fileURL);
            var progressContainer = document.createElement('div');
            progressContainer.setAttribute('class', style.progress);
            container.appendChild(progressContainer);

            var progressCallback = function progressCallback(progressEvent) {
                var percent = Math.floor(100 * progressEvent.loaded / progressEvent.total / (urls.length + 1));
                progressContainer.innerHTML = 'Loading ' + percent + '%';
            };

            createViewer(container);
            var nbURLs = urls.length;
            var nbLoadedData = 0;

            /* eslint-disable no-loop-func */

            var _loop = function _loop() {
                var url = urls.pop();
                var name = Array.isArray(userParams.name) ? userParams.name[urls.length] : 'Data ' + (urls.length + 1);
                _HttpDataAccessHelper2.default.fetchBinary(url, {
                    progressCallback: progressCallback
                }).then(function (binary) {
                    nbLoadedData++;
                    if (nbLoadedData === nbURLs) {
                        container.removeChild(progressContainer);
                    }
                    createPipeline(name, binary);
                    updateCamera(renderer.getActiveCamera());
                });
            };

            while (urls.length) {
                _loop();
            }
        })();
    }
}

/*reader.setUrl(`/dist/dist/bunny.vtk`).then(() => {
    const polydata = reader.getOutputData(0);
    const mapper = vtkMapper.newInstance();
    const actor = vtkActor.newInstance();

    actor.setMapper(mapper);
    mapper.setInputData(polydata);

    renderer.addActor(actor);

    resetCamera();
    render();*/

// -----------------------------------------------------------
// Make some variables global so that you can inspect and
// modify objects in your browser's developer console:
// -----------------------------------------------------------

/*
global.reader = reader;
global.fullScreenRenderer = fullScreenRenderer;*/
//# sourceMappingURL=index.js.map