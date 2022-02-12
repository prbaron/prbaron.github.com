const { DateTime } = require("luxon");
const fs = require("fs");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItContainer = require('markdown-it-container');
const { createContainer } = require('./eleventy/container');
const slugify = require('@sindresorhus/slugify');

module.exports = function (eleventyConfig) {
  // Add plugins
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Alias `layout: post` to `layout: layouts/post.njk`
  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd LLL yyyy');
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  // Copy the `img` and `css` folders to the output
  eleventyConfig.addPassthroughCopy('src/img');
  eleventyConfig.addPassthroughCopy('src/styles');

  // Customize Markdown library and settings:
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
    .use(markdownItAnchor, {
      permalink: true,
      permalinkClass: '',
      slugify: function (s) {
        return slugify(s);
      },
      renderPermalink: (slug, opts, state, idx) => {
        // get the content of the heading
        const linkContent = state.tokens[idx + 1].children[0].content;

        // empty the heading
        state.tokens[idx + 1].children[0].content = '';

        // create the tokens for the link
        const linkTokens = [
          Object.assign(new state.Token('link_open', 'a', 1), {
            attrs: [
              ...(opts.permalinkClass ? [
                [
                  'class',
                  opts.permalinkClass
                ]
              ] : []),
              [
                'href',
                opts.permalinkHref(slug, state)
              ],
              ...Object.entries(opts.permalinkAttrs(slug, state))
            ]
          }),
          Object.assign(new state.Token('html_block', '', 0), {
            content: linkContent,
          }),
          new state.Token('link_close', 'a', -1)
        ];

        state.tokens[idx + 1].children.push(...linkTokens);
      }
    })
    .use(markdownItContainer, 'danger', createContainer('danger'))
    .use(markdownItContainer, 'info', createContainer('info'))
    .use(markdownItContainer, 'warning', createContainer('warning'));

  eleventyConfig.setLibrary('md', markdownLibrary);

  // Override Browsersync defaults (used only with --serve)
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: [
      'md',
      'njk',
      'html',
      '11ty.js'
    ],

    // -----------------------------------------------------------------
    // If your site deploys to a subdirectory, change `pathPrefix`.
    // Don’t worry about leading and trailing slashes, we normalize these.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`

    // Optional (default is shown)
    pathPrefix: '/',
    // -----------------------------------------------------------------

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: 'njk',

    // Opt-out of pre-processing global data JSON files: (default: `liquid`)
    dataTemplateEngine: false,

    // These are all optional (defaults are shown):
    dir: {
      input: 'src',
      output: '_site'
    }
  };
};
