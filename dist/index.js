
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./ino-ui-tv.cjs.production.min.js')
} else {
  module.exports = require('./ino-ui-tv.cjs.development.js')
}
