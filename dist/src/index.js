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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileName = 'sphere.vtk'; // 'uh60.vtk'; // 'luggaBody.vtk';

// ----------------------------------------------------------------------------
// Standard rendering code setup
// ----------------------------------------------------------------------------

var fullScreenRenderer = _FullScreenRenderWindow2.default.newInstance();
var renderer = fullScreenRenderer.getRenderer();
var renderWindow = fullScreenRenderer.getRenderWindow();

var resetCamera = renderer.resetCamera;
var render = renderWindow.render;

// ----------------------------------------------------------------------------
// Example code
// ----------------------------------------------------------------------------

var reader = _PolyDataReader2.default.newInstance();
reader.setUrl('/dist/dist/bunny.vtk').then(function () {
    var polydata = reader.getOutputData(0);
    var mapper = _Mapper2.default.newInstance();
    var actor = _Actor2.default.newInstance();

    actor.setMapper(mapper);
    mapper.setInputData(polydata);

    renderer.addActor(actor);

    resetCamera();
    render();
});

// -----------------------------------------------------------
// Make some variables global so that you can inspect and
// modify objects in your browser's developer console:
// -----------------------------------------------------------

global.reader = reader;
global.fullScreenRenderer = fullScreenRenderer;
//# sourceMappingURL=index.js.map