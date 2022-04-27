/** @jsx node */

import { node } from '@krakenjs/jsx-pragmatic/src';
import { isIos, isFirefox, supportsPopups, animate, noop, destroyElement, uniqueID } from '@krakenjs/belter/src';
import { EVENT, CONTEXT } from 'zoid/src';
import { getContainerStyle, getSandboxStyle, CLASS } from './ui/styles.js';
import SafepayLogo from '../../assets/svgs/safepay-logo-white.svg'

export function Overlay({ context, close, focus, event, frame, prerenderFrame, content = {}, autoResize, hideCloseButton, nonce, fullScreen = false }) {
  const uid = `safepay-overlay-${ uniqueID() }`;

  function closeCheckout(e) {
    e.preventDefault();
    e.stopPropagation();
    close();
  }

  function focusCheckout(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!supportsPopups()) {
      return;
    }

    if (isIos()) {
      window.alert('Please switch tabs to reactivate the Safepay window');
    } else if (isFirefox()) {
      window.alert('Don\'t see the popup window?\n\nSelect "Window" in your toolbar to find "Log in to your Safepay account"');
    } else {
      focus();
    }
  }

  const setupAnimations = (name) => {
    return (el) => {
      const showContainer = () => animate(el, `show-${ name }`, noop);
      const hideContainer = () => animate(el, `hide-${ name }`, noop);
      event.on(EVENT.DISPLAY, showContainer);
      event.on(EVENT.CLOSE, hideContainer);
    };
  };

  const setupAutoResize = (el) => {
    event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
      if (typeof newWidth === 'number') {
        el.style.width = `${newWidth}px`;
      }

      if (typeof newHeight === 'number') {
        el.style.height = `${newHeight}px`;
      }
    });
  };

  const outletOnRender = (el) => {
    setupAnimations('component')(el);
    if (autoResize) {
      setupAutoResize(el);
    }
  };

  let outlet;

  if (frame && prerenderFrame) {
    frame.classList.add(CLASS.COMPONENT_FRAME);
    prerenderFrame.classList.add(CLASS.PRERENDER_FRAME);
    
    prerenderFrame.classList.add(CLASS.VISIBLE);
    frame.classList.add(CLASS.INVISIBLE);

    event.on(EVENT.RENDERED, () => {
      prerenderFrame.classList.remove(CLASS.VISIBLE);
      prerenderFrame.classList.add(CLASS.INVISIBLE);

      frame.classList.remove(CLASS.INVISIBLE);
      frame.classList.add(CLASS.VISIBLE);

      setTimeout(() => {
        destroyElement(prerenderFrame);
      }, 1);
    });

    outlet = (
      <div class={ CLASS.OUTLET } onRender={ outletOnRender }>
        <node el={ frame } />
        <node el={ prerenderFrame } />
      </div>
    );
  }

  return (
    <div id={ uid } onRender={ setupAnimations('container') } class="safepay-checkout-sandbox">
      <style>{ getSandboxStyle({ uid }) }</style>
      <iframe title="Safepay Checkout Overlay" name={ `__safepay_checkout_sandbox_${ uid }__` } scrolling="no" class="safepay-checkout-sandbox-iframe">
        <html>
          <body>
            <div id={ uid } onClick={ focusCheckout } class={ `safepay-overlay-context-${ context } safepay-checkout-overlay` }>
              { !hideCloseButton && <a href='#' class="safepay-checkout-close" onClick={ closeCheckout } aria-label="close" role="button" /> }
              { !fullScreen &&
                <div class="safepay-checkout-modal">
                  <div class="safepay-checkout-logo">
                    <img src={SafepayLogo} />
                  </div>
                  {content.windowMessage &&
                    <div class="safepay-checkout-message">
                      {content.windowMessage}
                    </div>}
                  {content.continueMessage &&
                    <div class="safepay-checkout-continue">
                      <a onClick={ focus } href='#'>{content.continueMessage}</a>
                    </div>}
                  <div class="safepay-checkout-loader">
                    <div class="safepay-spinner" />
                  </div>
                </div>}
              <div class={ fullScreen ? 'safepay-checkout-iframe-container-full' : 'safepay-checkout-iframe-container' }>
                { outlet }
              </div>

              <style>{ getContainerStyle({ uid }) }</style>
            </div>
          </body>
        </html>
      </iframe>
    </div>
  );
}