const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
// const copy = require('rollup-plugin-copy');
module.exports = {
  rollup(config) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        // Extract CSS to a separate file
        extract: true,

        // Minify the CSS (optional)
        minimize: true,

        // Enable modules (optional, for CSS Modules)
        modules: true,
        inject: false,
        // extract: false,
      })
      // copy({
      //   targets: [{ src: 'src/styles/*.css', dest: 'dist/styles' }],
      // })
    );
    return config;
  },
};
