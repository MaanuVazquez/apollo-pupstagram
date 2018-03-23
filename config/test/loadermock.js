/*
 * Borrowed from https://github.com/dqisme/__react-svg-loader-bug-36/blob/89976f5111f41bcb8ea5e37b88e42250c484dc25/test/loadermock.js
 *
 * Removed mocking for non-*.svg files.
 */

import requireHacker from 'require-hacker';

const fakeComponentString = `
  require('create-react-class')({
    render() {
      return null;
    }
  })
`;

// for fake component
requireHacker.hook('svg', path => `module.exports = ${fakeComponentString}`);
