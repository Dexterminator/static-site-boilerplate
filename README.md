# static-site-boilerplate
Boilerplate for a generic static site with:

- `yarn` for dependency management
- `gulp` for building minified html, css, and js
- `pug` (configured to not compile files in `/partials`) for html templates
- `stylus` for css preprocessing
- Browsersync for automatic reload on any changes to pug, stylus, or js files
- Support for pretty (no `.html` at the end) urls in local web server
- Deploy to Netlify (or similar static site hosting service) by specifying
minimal settings and pushing to master

### Install dependencies
`yarn install`

### Build html, css, and js
`gulp`

### Run a local web server with autobuild and browser reload on file changes
`gulp watch`

### Netlify settings
```
(Netlify will automatically run yarn install when it sees the yarn.lock file)
Build command: gulp
Publish directory: public
```
