const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = !isDevelopment

const filename = (ext) => (isDevelopment ? `static/${ext}/[name].${ext}` : `static/${ext}/[name].[contenthash:8].${ext}`)
const chunkname = (ext) =>
    isDevelopment ? `static/${ext}/[name].chunk.${ext}` : `static/${ext}/[name].[contenthash:8].chunk.${ext}`

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDevelopment,
                reloadAll: true,
            },
        },
        {
            loader: 'css-loader',
        },
    ]

    if (extra) loaders.push(extra)
    return loaders
}

const babelOptions = (preset) => {
    const options = {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
    }

    if (preset) options.presets.push(preset)
    return options
}

const optimizationOptions = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        },
    }
    if (isProduction) {
        config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserWebpackPlugin()]
    }
    return config
}

const reactModuleOptions = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOptions('@babel/preset-react'),
        },
    ]
    if (isDevelopment) loaders.push('eslint-loader')
    return loaders
}

const pluginsList = () => {
    const plugins = [
        new HTMLWebpackPlugin({
            template: './public/index.html',
            minify: {
                collapseWhitespace: isProduction,
            },
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './public/favicon.ico',
                    to: path.resolve(__dirname, 'build'),
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
            chunkFilename: chunkname('css'),
        }),
    ]

    return plugins
}

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        publicPath: '/',
        filename: filename('js'),
        path: path.resolve(__dirname, 'build'),
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        extensions: ['.js', '.jsx', '.json'],
    },
    optimization: optimizationOptions(),
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'build'),
        hot: isDevelopment,
        port: 4200,
    },
    devtool: isDevelopment ? 'source-map' : '',
    plugins: pluginsList(),
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node-modules/,
                use: reactModuleOptions(),
            },
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                options: {
                    name: 'static/media/[name].[ext]',
                },
                loader: 'file-loader',
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                options: {
                    name: 'static/fonts/[name].[ext]',
                },
                loader: 'file-loader',
            },
        ],
    },
}
