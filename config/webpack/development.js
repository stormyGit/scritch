process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')
const CircularDependencyPlugin = require('circular-dependency-plugin')
// const PrettierPlugin = require("prettier-webpack-plugin");

environment.loaders.append('eslint', {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'eslint-loader',
            options: { emitWarning: true },
        },
    ],
})
environment.plugins.append(
    'circularDependency',
    new CircularDependencyPlugin({
        // exclude detection of files based on a RegExp
        exclude: /a\.js|node_modules/,
        // include specific files based on a RegExp
        include: /dir/,
        // add errors to webpack instead of warnings
        failOnError: true,
        // allow import cycles that include an asyncronous import,
        // e.g. via import(/* webpackMode: "weak" */ './file.js')
        allowAsyncCycles: false,
        // set the current working directory for displaying module paths
        cwd: process.cwd(),
    })
)

module.exports = environment.toWebpackConfig()
