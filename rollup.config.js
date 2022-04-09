import { babel } from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';

const production =
    process.env.NODE_ENV === 'production' && !process.env.ROLLUP_WATCH;

const src = 'public';
const dest = 'dist';
const name = 'bundle';

const input = `${src}/js/index.js`;
const out = `${dest}/js/${name}`;

const plugins = [
    resolve({
        browser: true,
    }),
    commonjs(),
    del({ targets: `${dest}}/*` }),
    copy({
        targets: [
            {
                src: `${src}/js/vendor/*`,
                dest: `${dest}/js/vendor`,
            },
            {
                src: `${src}/{css,img}`,
                dest,
            },
        ],
    }),
    babel({
        babelrc: false,
        babelHelpers: 'runtime',
        exclude: [
            /node_modules/,
            /core-js/, //https://github.com/rollup/rollup-plugin-babel/issues/254
        ],
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {
                        browsers:
                            '> 0.25%, last 4 major versions, not dead, not ie 11',
                    },
                    corejs: 3,
                    useBuiltIns: 'usage',
                },
            ],
        ],
        plugins: [
            [
                '@babel/plugin-transform-runtime',
                {
                    regenerator: true,
                },
            ],
        ],
    }),
    production && terser(),
];

export default [
    {
        input,
        plugins,
        output: [
            {
                file: `${out}.js`,
                format: 'iife',
                sourcemap: true,
            },
        ],
    },
    {
        input,
        plugins,
        output: [
            {
                file: `${out}.mjs`,
                format: 'module',
                sourcemap: true,
            },
        ],
    },
];
