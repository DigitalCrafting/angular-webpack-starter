module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            {pattern: './projects/unit-tests.ts', watched: false},
        ],
        preprocessors: {'./projects/unit-tests.ts': ['webpack', 'sourcemap']},

        webpack: require('./test-webpack.config'),
        reporters: [
            'progress', 'coverage'
        ],
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: [
            'ChromeHeadless'
        ],
        customerLaunchers: {
            'ChromeHeadless': {
                base: 'Chrome',
                flags: [
                    '--headless',
                    '--disable-gpu',
                    '--remote-debugging-port=9222'
                ]
            }
        },
        singleRun: true,
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        concurrency: Infinity
    });
};
