/* global zoomSdk */

async function configure() {
    return zoomSdk.config({
        size: { width: 480, height: 360 },
        capabilities: [
            /* Add Capabilities Here */
            'shareApp',
        ],
    });
}

try {
    const configResponse = await configure();
    console.debug('Zoom JS SDK Configuration', configResponse);
} catch (e) {
    console.error(e);
}
