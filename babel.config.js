//this is so JEST can work
module.exports = {
  presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
  "plugins": [
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ]
  ]
};