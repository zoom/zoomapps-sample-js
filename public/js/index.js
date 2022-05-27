/* global zoomSdk */

async function configure() {
    return zoomSdk.config({
        size: { width: 480, height: 360 },
        capabilities: [
            /* Add Capabilities Here */
            'onMyActiveSpeakerChange',
            'onActiveSpeakerChange',
        ],
    });
}

(async () => {
    try {
        const configResponse = await configure();
        console.debug('Zoom JS SDK Configuration', configResponse);

        zoomSdk.addEventListener('onMyActiveSpeakerChange', (evt) => {
            console.log(evt);
        });
    } catch (e) {
        console.error(e);
    }
})();
