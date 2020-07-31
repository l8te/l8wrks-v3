const fs = require("fs");

const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

// configure date stuff

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Input directory: src
  // Output directory: _site

  // The following copies to `_site/assets` and `_site/bookshelf`
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("bookshelf");
  // remember to add passthrough for css once we have some
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {

        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('_site/404.html');
          // Provides the 404 content without redirect.
          res.write(content_404);
          // Add 404 http status code in request header.
          // res.writeHead(404, { "Content-Type": "text/html" });
          res.writeHead(404);
          res.end();
        });
      }
    }
  });
};