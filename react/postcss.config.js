var path = require('path')
var precss = require('precss')
var lost = require('lost')
var autoprefixer = require('autoprefixer')
var postcssFontMagician = require('postcss-font-magician')
var postcssResponsiveFont = require("postcss-responsive-font")
var postcssModularScale = require("postcss-modular-scale")
var partialImport = require('postcss-partial-import')
var postcssMath = require('postcss-math')
var cssNext = require("postcss-cssnext")
    // load global variables for use in ALL stylesheets.
var variablesConfig = require(path.resolve(__dirname, './src/modules/App/styles/_variables.js'))
    // objected-oriented variables accessible via: `$colors.accent`, `$animations.bounce_1`
var variables = require('postcss-variables')({
    globals: variablesConfig
})
var postcssNesting = require('postcss-nesting')
var postcssInlineComment = require('postcss-inline-comment')
var hexToRGBA = require('postcss-hexrgba')

module.exports = {
  plugins: [
    postcssInlineComment,
    precss,
    postcssNesting,
    require('autoprefixer')({
      browsers: ['last 3 versions']
    }),
    partialImport({
        prefix: '',
    }),
    postcssModularScale,
    variables,
    postcssFontMagician,
    lost,
    postcssMath,
    postcssResponsiveFont,
    hexToRGBA,
  ]
}
