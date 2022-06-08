const concurrently = require("concurrently")
const pkg = require("../package.json")

const n = pkg.name

const {result} = concurrently([
        {
            command: `APP_NAME='${n}' DEBUG='${n}*' nodemon app.js`,
            name: 'dev-server',
            prefixColor: 'inverse.cyan'
        },
        {
            command: `rollup -c --watch`,
            name: 'dev-app',
            prefixColor: 'inverse.yellow'

        },
    ],
);
result.catch(e => console.error(e))
