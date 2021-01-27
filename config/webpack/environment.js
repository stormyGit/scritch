const { environment } = require('@rails/webpacker')
const webpack = require('webpack')
const dotenv = require('dotenv')

const dotenvFiles = [
    `.env.${process.env.NODE_ENV}.local`,
    '.env.local',
    `.env.${process.env.NODE_ENV}`,
    '.env',
]
dotenvFiles.forEach((dotenvFile) => {
    dotenv.config({ path: dotenvFile, silent: true })
})

const babelLoader = environment.loaders.get('babel')
babelLoader.test = /\.(js|jsx|ts|tsx|mjs)?(\.erb)?$/

environment.plugins.prepend(
    'Environment',
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env)))
)

module.exports = environment
