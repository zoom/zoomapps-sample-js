import cookieSession from 'cookie-session';
import config from '../config';

export default cookieSession({
    name: 'session',
    httpOnly: true,
    keys: [config.zoomApp.sessionSecret],
    maxAge: 24 * 60 * 60 * 1000,
    secure: true,
});
