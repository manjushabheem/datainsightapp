import webpack from 'webpack';
import webpackConfig from './_base';

webpackConfig.devtool = 'eval';
webpackConfig.plugins.push(
    new webpack.DefinePlugin( {
        'process.env.NODE_ENV': JSON.stringify( 'development' ),
    } )
);

export default webpackConfig;
