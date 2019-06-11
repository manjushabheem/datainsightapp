import path from 'path';
import { argv } from 'yargs';
import appConfig from '../src/appConfig';

export default ( env ) => {

  const config = new Map();

  // console.log( 'NODE_ENV', process.env.NODE_ENV );
  // console.log( process.env );

  // ------------------------------------
  // User Configuration
  // ------------------------------------
  config.set( 'dir_src', 'src' );
  config.set( 'dir_dist', 'build' );

  config.set( 'env', env.NODE_ENV );
  config.set( 'port', appConfig.appPort );
  config.set( 'apiPort', env.NODE_APIPORT );
  config.set( 'apiUrl', env.NODE_APIURL );
  config.set( 'apiProtocol', env.NODE_APIPROTOCOL );

  config.set( 'globals', {
    'process.env': {
      'NODE_ENV': JSON.stringify( config.get( 'env' ) ),
      'NODE_APIPORT': JSON.stringify( config.get( 'apiPort' ) ),
      'NODE_APIURL': JSON.stringify( config.get( 'apiUrl' ) ),
      'NODE_APIPROTOCOL': JSON.stringify( config.get( 'apiProtocol' ) ),
    },
    'SERVICE_HOST': JSON.stringify( config.get( 'service-host' ) ),
    'NODE_ENV': config.get( 'env' ),
    '__DEV__': config.get( 'env' ) === 'development',
    '__PROD__': config.get( 'env' ) === 'production',
    '__DEBUG__': config.get( 'env' ) === 'development' && !argv.no_debug,
    '__DEBUG_NW__': Boolean( argv.nw ),
  } );

  // Project
  config.set( 'path_project', path.resolve( __dirname, '../' ) );

  // Utilities
  const paths = ( () => {
    const base = [ config.get( 'path_project' ) ];
    const resolve = path.resolve;
    const project = ( ...args ) => resolve.apply( resolve, [ ...base, ...args ] );
    return {
      project: project,
      src: project.bind( null, config.get( 'dir_src' ) ),
    };
  } )();

  config.set( 'utils_paths', paths );
  return config;
}
