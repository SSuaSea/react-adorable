const webpack = require('webpack');

module.exports = function override(config) {
    // Resolve 폴리필 추가
    config.resolve.fallback = {
        timers: require.resolve('timers-browserify'),
        stream: require.resolve('stream-browserify'),
        process: require.resolve('process/browser'), // process 폴리필 추가
    };

    // XML2JS의 core 모듈 폴리필 추가
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    );

    return config;
};
