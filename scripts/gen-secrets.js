import envsub from 'envsub';
import crypto from 'crypto';

const outputFile = '.env';
const templateFile = `${outputFile}.sample`;

const options = {
    protect: true,
    envs: [
        {
            name: '_SESSION_SECRET',
            value: crypto.randomBytes(32).toString('hex'),
        },
    ],
};

envsub({ templateFile, outputFile, options }).catch((e) => console.error(e));
