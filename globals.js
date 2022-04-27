import postRobotGlobals from 'post-robot/globals.js';
import zoidGlobals from 'zoid/globals.js';

const globals = {
  __ZOID__: {
    ...zoidGlobals.__ZOID__,
    __DEFAULT_CONTAINER__: true,
    __DEFAULT_PRERENDER__: true,
    __FRAMEWORK_SUPPORT__: true,
    __SCRIPT_NAMESPACE__:  true
  },

  __POST_ROBOT__: {
    ...postRobotGlobals.__POST_ROBOT__,
    __IE_POPUP_SUPPORT__: false,
    __SCRIPT_NAMESPACE__: true
  }
};

export default globals