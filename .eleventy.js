module.exports = function(config) {
  config.addPassthroughCopy({ public: './' })

  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
  })

  config.addCollection('hu', api => api.getFilteredByGlob('src/blog/hu/*.md'))
  config.addCollection('en', api => api.getFilteredByGlob('src/blog/en/*.md'))

  const countries = require('./src/app/helpers/countries')

  countries.hu.forEach(country => {
    config.addCollection(`hu_${country || 'világ'}`, api =>
      api
        .getFilteredByGlob('src/blog/hu/*.md')
        .filter(post => post.data.country === country))
  })

  config.addShortcode('baseUrl', () => 'https://nagyfalat.com')

  const markdownIt = require('markdown-it')
  const markdownItAttrs = require('markdown-it-attrs')
  const markdownItSpan = require('markdown-it-bracketed-spans')
  const options = {
    html: true,
    linkify: true,
    typographer: true,
  }
  const markdownLib = markdownIt(options).use(markdownItAttrs).use(markdownItSpan)
  config.setLibrary('md', markdownLib)

  return {
    templateFormats: ['md', 'jpg', 'png', 'gif'],
    dir: {
      input: 'src',
      output: 'dist',
      layouts: 'app/layouts',
    }
  }
}
