const ghpages = require('gh-pages');
const path = require('path');

ghpages.publish(
  path.join(__dirname, 'storybook-static'),
  {
    branch: 'gh-pages',
    dest: 'storybook', // deploy to /storybook/ subfolder
    add: true, // preserve root files/folders
    message: 'Deploy Storybook',
  },
  function (err) {
    if (err) {
      console.error('🚨 Deployment failed:', err);
    } else {
      console.log('✅ Successfully deployed to gh-pages/test!');
    }
  }
);
