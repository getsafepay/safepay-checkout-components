import { CONTEXT } from 'zoid/src/index.js';

export const CLASS = {
  OUTLET:          'outlet',
  VISIBLE:         'visible',
  INVISIBLE:       'invisible',
  COMPONENT_FRAME: 'component-frame',
  PRERENDER_FRAME: 'prerender-frame'
};

export function getSandboxStyle({ uid }) {
  return `
      #${ uid }.safepay-checkout-sandbox {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          width: 100vw;
          height: 100vh;
          max-width: 100%;
          max-height: 100%;
          min-width: 100%;
          min-height: 100%;
          z-index: 2147483647;
          animation-duration: 0.3s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards !important;
          opacity: 0;
      }
      #${ uid }.safepay-checkout-sandbox .safepay-checkout-sandbox-iframe {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
      }
      @keyframes show-container {
          from {
              opacity: 0;
          }
          to {
              opacity: 1;
          }
      }
      @keyframes hide-container {
          from {
              opacity: 1;
          }
          50% {
              opacity: 1;
          }
          to {
              opacity: 0;
          }
      }
  `;
}


export function getContainerStyle({ uid }) {
  return `
  #${ uid } {
    position: absolute;
    z-index: 2147483647;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translate3d(0, 0, 0);
    background-color: black;
    background-color: rgba(0, 0, 0, 0.8);
    background: radial-gradient(50% 50%, ellipse closest-corner, rgba(0,0,0,0.6) 1%, rgba(0,0,0,0.8) 100%);
    color: #fff;
  }
  #${ uid } a {
    color: #fff;
  }
  #${ uid } .safepay-checkout-close:before,
  #${ uid } .safepay-checkout-close:after {
    background-color: #fff;
  }
  #${ uid }.safepay-overlay-context-${ CONTEXT.POPUP } {
    cursor: pointer;
  }
  #${ uid } a {
    text-decoration: none;
  }
  #${ uid } .safepay-checkout-modal {
    font-family: "HelveticaNeue", "HelveticaNeue-Light", "Helvetica Neue Light", helvetica, arial, sans-serif;
    font-size: 14px;
    text-align: center;
    box-sizing: border-box;
    max-width: 350px;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translateX(-50%) translateY(-50%);
    cursor: pointer;
    text-align: center;
  }
  #${ uid }.safepay-overlay-loading .safepay-checkout-message, #${ uid }.safepay-overlay-loading .safepay-checkout-continue {
    display: none;
  }
  .safepay-checkout-loader {
    display: none;
  }
  #${ uid }.safepay-overlay-loading .safepay-checkout-loader {
    display: block;
  }
  #${ uid } .safepay-checkout-modal .safepay-checkout-logo {
    cursor: pointer;
    margin-bottom: 30px;
    display: inline-block;
  }
  #${ uid } .safepay-checkout-modal .safepay-checkout-logo img {
    height: 36px;
  }
  #${ uid } .safepay-checkout-modal .safepay-checkout-logo img.safepay-checkout-logo-pp {
    margin-right: 10px;
  }
  #${ uid } .safepay-checkout-modal .safepay-checkout-message {
    font-size: 15px;
    line-height: 1.5;
    padding: 10px 0;
  }
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-message, #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-continue {
    display: none;
  }
  #${ uid } .safepay-checkout-modal .safepay-checkout-continue {
    font-size: 15px;
    line-height: 1.35;
    padding: 10px 0;
    font-weight: bold;
  }
  #${ uid } .safepay-checkout-modal .safepay-checkout-continue a {
    border-bottom: 1px solid white;
  }
  #${ uid } .safepay-checkout-close {
    position: absolute;
    right: 16px;
    top: 16px;
    width: 16px;
    height: 16px;
    opacity: 0.6;
  }
  #${ uid }.safepay-overlay-loading .safepay-checkout-close {
    display: none;
  }
  #${ uid } .safepay-checkout-close:hover {
    opacity: 1;
  }
  #${ uid } .safepay-checkout-close:before, .safepay-checkout-close:after {
    position: absolute;
    left: 8px;
    content: ' ';
    height: 16px;
    width: 2px;
  }
  #${ uid } .safepay-checkout-close:before {
    transform: rotate(45deg);
  }
  #${ uid } .safepay-checkout-close:after {
    transform: rotate(-45deg);
  }
  #${ uid } .safepay-checkout-iframe-container {
    display: none;
  }
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container,
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container > .${ CLASS.OUTLET },
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container > .${ CLASS.OUTLET } > iframe {
    max-height: 95vh;
    max-width: 95vw;
  }
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container-full,
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container-full > .${ CLASS.OUTLET },
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container-full > .${ CLASS.OUTLET } > iframe {
    height: 100vh;
    max-width: 100vw;
    width: 100vw;
  }
  @media screen and (max-width: 470px) {
    #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container,
    #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container > .${ CLASS.OUTLET },
    #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container > .${ CLASS.OUTLET } > iframe {
      max-height: 85vh;
    }
    #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container-full,
    #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container-full > .${ CLASS.OUTLET },
    #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container-full > .${ CLASS.OUTLET } > iframe {
      height: 100vh;
    }
  }
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 450px;
    transform: translate(-50%, -50%);
    transform: translate3d(-50%, -50%, 0);
    border-radius: 10px;
    overflow: hidden;
  }
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } {
    position: relative;
    transition: all 0.3s ease;
    animation-duration: 0.3s;
    animation-fill-mode: forwards !important;
    min-width: 450px;
    max-width: 450px;
    width: 450px;
    height: 535px;
    background-color: white;
    overflow: auto;
    opacity: 0;
    transform: scale3d(.3, .3, .3);
    -webkit-overflow-scrolling: touch;
  }
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } > iframe {
    position: absolute;
    top: 0;
    left: 0;
    transition: opacity .4s ease-in-out;
  }
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } > iframe.${ CLASS.COMPONENT_FRAME } {
    z-index: 100;
  }
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } > iframe.${ CLASS.PRERENDER_FRAME } {
    z-index: 200;
  }
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } > iframe.${ CLASS.VISIBLE } {
    opacity: 1;
    z-index: 200;
  }
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } > iframe.${ CLASS.INVISIBLE } {
    opacity: 0;
    z-index: 100;
  }
  @media screen and (max-width: 470px) {
    #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .safepay-checkout-iframe-container,
    #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } {
      min-width: 100%;
      min-width: calc(100% - 20px);
      max-width: 100%;
      max-width: calc(100% - 20px);
    }
  }
  #${ uid }.safepay-overlay-context-${ CONTEXT.IFRAME } .${ CLASS.OUTLET } iframe {
    width: 1px;
    min-width: 100%;
    height: 100%;
  }
  @keyframes show-component {
    from {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }
    to {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }
  @keyframes hide-component {
    from {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
    to {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }
  }
  .safepay-spinner {
    height: 30px;
    width: 30px;
    display: inline-block;
    box-sizing: content-box;
    opacity: 1;
    filter: alpha(opacity=100);
    animation: rotation .7s infinite linear;
    border-left: 8px solid rgba(0, 0, 0, .2);
    border-right: 8px solid rgba(0, 0, 0, .2);
    border-bottom: 8px solid rgba(0, 0, 0, .2);
    border-top: 8px solid #fff;
    border-radius: 100%
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(359deg)
    }
  }`;
}