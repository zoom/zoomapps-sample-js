import zoomSdk from '@zoom/appssdk';

(async () => {
    try {
        const configResponse = await zoomSdk.config({
            capabilities: ['startRTMS', 'stopRTMS'],
        });

        console.debug('Zoom JS SDK Configuration', configResponse);

        const { runningContext } = configResponse;
        if (runningContext === 'inMeeting') {
            await zoomSdk.callZoomApi('startRTMS');
        }
    } catch (e) {
        console.error(e);
    }
})();
