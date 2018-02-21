import 'vtk.js/Sources/favicon';

import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';
import vtkFullScreenRenderWindow from 'vtk.js/Sources/Rendering/Misc/FullScreenRenderWindow';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkPolyDataReader from 'vtk.js/Sources/IO/Legacy/PolyDataReader';

import HttpDataAccessHelper from 'vtk.js/Sources/IO/Core/DataAccessHelper/HttpDataAccessHelper';

const fileName = 'sphere.vtk'; // 'uh60.vtk'; // 'luggaBody.vtk';

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

const fileInput = document.getElementById("fileInput");

function handleFile(e) {
    console.log(e);
    preventDefaults(e);
    const dataTransfer = e.dataTransfer;
    const files = e.target.files || dataTransfer.files;
    if (files.length > 0) {
        load(myContainer, {files});
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
        let count = options.files.length;
        while (count--) {
            loadFile(options.files[count]);
        }
        updateCamera(renderer.getActiveCamera());
    } else if (options.fileURL) {
        const urls = [].concat(options.fileURL);
        const progressContainer = document.createElement('div');
        progressContainer.setAttribute('class', style.progress);
        container.appendChild(progressContainer);

        const progressCallback = (progressEvent) => {
            const percent = Math.floor(
                100 * progressEvent.loaded / progressEvent.total / (urls.length + 1)
            );
            progressContainer.innerHTML = `Loading ${percent}%`;
        };

        createViewer(container);
        const nbURLs = urls.length;
        let nbLoadedData = 0;

        /* eslint-disable no-loop-func */
        while (urls.length) {
            const url = urls.pop();
            const name = Array.isArray(userParams.name)
                ? userParams.name[urls.length]
                : `Data ${urls.length + 1}`;
            HttpDataAccessHelper.fetchBinary(url, {
                progressCallback,
            }).then((binary) => {
                nbLoadedData++;
                if (nbLoadedData === nbURLs) {
                    container.removeChild(progressContainer);
                }
                createPipeline(name, binary);
                updateCamera(renderer.getActiveCamera());
            });
        }
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
