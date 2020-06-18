const path = require('path');

module.exports = (context, options) => {
  return {
    name: 'docusaurus-plugin-sidebar',
    getPathsToWatch() {
      const contentPath = path.resolve(context.siteDir, options.path);
      console.log('contentPath is', contentPath);
      return [`${contentPath}/**/*.yml`];
    }
  }
}
