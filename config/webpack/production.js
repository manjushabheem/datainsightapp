import webpack from 'webpack';
import webpackConfig from './_base';
webpackConfig.devtool = 'source-map';
webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin( {
        output: { comments: false },
        sourceMap: true,
        mangle: true,
        compress : {
            'unused'    : true,
            'warnings'    : true,
            'dead_code' : true,
        },
    } )
);
export default webpackConfig;
