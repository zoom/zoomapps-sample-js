import zoomSdk from '@zoom/appssdk';

(async () => {
    try {
        const configResponse = await zoomSdk.config({
            size: { width: 480, height: 360 },
            capabilities: [
                /* Add Capabilities Here */
                'shareApp',
            ],
        });

        console.debug('Zoom JS SDK Configuration', configResponse);
    } catch (e) {
        console.error(e);
    }
})();
