const cdnRoot = process.env.CDN_ROOT || 'http://localhost:3000';

const remotes = {
  appNav: `appNav@http://localhost:3001/remoteEntry.js`,
  appHome: `appHome@http://localhost:3002/remoteEntry.js`,
}

module.exports = remotes;