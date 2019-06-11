* The React components in this directory are meant to be used by other applications
* So .scss and .js files in this _global directory must not make any reference to any components, styles or images outside this directory.
* We may decide to move this directory to another repository any time. That is why there should not be any dependency for any resources of HFJ app except public npm packages.
* This directory is a good place for SASS mixins
* 'sub' directory holds the components that are needed by the components in this directory. They are not meant to be used directly outside this directory