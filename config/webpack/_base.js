import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import getConfig from '../../config';
//import ModernizrWebpackPlugin from 'modernizr-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const config = getConfig( process.env );

//let CopyWebpackPlugin = require( 'copy-webpack-plugin' );

const paths = config.get( 'utils_paths' );

const webpackConfig = {
    name    : 'client',
    target  : 'web',
    entry   : {
        app : [
            paths.project( config.get( 'dir_src' ) ) + '/index.js',
        ],
    },
    output : {
        filename   : '[name].[hash].js',
        path       : paths.project( config.get( 'dir_dist' ) ),
        publicPath : '/',
    },
    stats: {
      colors: true,
      modules: true,
      reasons: true,
      errorDetails: true,
    },
    devtool: 'source-map',
    plugins : [
        // new CopyWebpackPlugin( [ { from: 'data', to: 'data' } ] ),
        //new ModernizrWebpackPlugin(),
        new ExtractTextPlugin( { filename: 'css/[name].[hash].css' } ),
        new webpack.DefinePlugin( config.get( 'globals' ) ),
        //new webpack.optimize.OccurrenceOrderPlugin(),
        //new webpack.optimize.DedupePlugin(),
        new webpack.ProvidePlugin( {
            fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch',
            Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise',
            $: 'jquery',
            jQuery: 'jquery',
        } ),
        new HtmlWebpackPlugin( {
            template : paths.src( '../src/index.html' ),
            hash     : false,
            filename : 'index.html',
            inject   : 'body',
            minify   : {
                collapseWhitespace : true,
            },
        } ),
    ],
    resolve : {
        modules: [
            'src',
            'node_modules',
        ],
        extensions: [ '.json', '.js', '.jsx' ],
    },
    module : {
        rules : [
            {
                test: /\.jsx?$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre',
            },
            {
                test : /\.(js|jsx)$/,
                exclude : /node_modules/,
                use  : {
                    loader: 'babel-loader',
                    options: {
                        presets: [ 'es2015', 'stage-0', 'react' ],
                        plugins: [ 'transform-decorators-legacy' ],
                    },
                },
            },
            {
                test    : /\.css$/,
                loader : ExtractTextPlugin.extract( { fallback: 'style-loader', use: 'css-loader'} ),
            },
            {
                test    : /\.scss$/,
                loader : ExtractTextPlugin.extract( { fallback: 'style-loader', use: 'css-loader!sass-loader' } ),
            },
            {
                test: /vendor\/.+\.(jsx|js)$/,
                use: 'imports-loader?jQuery=jquery,$=jquery,this=>window',
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: 'url-loader?limit=10000&minetype=application/font-woff',
            },
            {
                test: /\.(ttf|eot|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?prefix=images/&name=[path][name].[ext]',
            },
            {
                test: /\.(png|jpg)(\?.*)?$/,
                loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]',
            },
        ],
    },
    externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        fs: 'empty',
    },
  devServer: {
    port : config.get( 'port' ),
    compress : true,
    disableHostCheck : true,
  },

};

const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin(
    {name: 'vendor', filename: '[name].[hash].js'}
);
webpackConfig.plugins.push( commonChunkPlugin );
export default webpackConfig;
