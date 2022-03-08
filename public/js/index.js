/* global zoomSdk */

zoomSdk
    .config({
        size: { width: 480, height: 360 },
        capabilities: [
            /* Zoom App Capabilities here */
            'shareApp',
        ],
    })
    .then((r) => console.log(r))
    .catch((e) => console.error(e));
