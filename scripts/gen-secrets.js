import envsub from 'envsub';
import crypto from 'crypto';
import fs from 'fs';

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

if (!fs.existsSync(outputFile))
    envsub({ templateFile, outputFile, options }).catch((e) =>
        console.error(e)
    );
