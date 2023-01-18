const path = require("path");
module.exports = {
    // ...
    devServer: {
        port: 3001
    },
    webpack: {
        alias: {
            '@pages': path.join(path.resolve(__dirname, './src/pages/')),
            '@layouts': path.join(path.resolve(__dirname, './src/layouts/')),
            '@routes': path.join(path.resolve(__dirname, './src/routes/')),
            '@components': path.join(path.resolve(__dirname, './src/components/')),
            '@helper': path.join(path.resolve(__dirname, './src/helper/')),
            '@interfaces': path.join(path.resolve(__dirname, './src/interfaces/')),
            '@services': path.join(path.resolve(__dirname, './src/services/')),
            '@features': path.join(path.resolve(__dirname, './src/features/')),
            '@hooks': path.join(path.resolve(__dirname, './src/hooks/')),
            '@assets': path.join(path.resolve(__dirname, './src/assets/')),
        }
    }
  };