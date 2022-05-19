const concurrently = require("concurrently")
const pkg = require("../package.json")

const {result} = concurrently([
        {
            command: `DEBUG='${pkg.name}*' nodemon app.js`,
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
