const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const copy = require('rollup-plugin-copy');

module.exports = {
  rollup(config) {
    config.plugins.push(
      replace({
        preventAssignment: true,
      }),
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: false,
        extract: false,
      }),
      copy({
        targets: [{ src: 'src/styles/*.css', dest: 'dist/styles' }],
      })
    );
    return config;
  },
};
