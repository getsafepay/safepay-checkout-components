/** @jsx node */

import { node, dom } from '@krakenjs/jsx-pragmatic/src';
import { create, CONTEXT } from 'zoid/src'
import { isDevice, noop } from '@krakenjs/belter/src';
import { Config } from '../../configs/index.js'
import { DEFAULT_POPUP_SIZE } from './ui/config.js'
import { SpinnerPage } from './prerender.jsx';
import { Overlay } from './container.jsx';

export const Checkout = create({
  tag: 'safepay-checkout',
  url: ({ props }) => Config.checkoutUrls[props.env],
  defaultContext: CONTEXT.POPUP,
  domain: Config.safepayDomainRegex,
  dimensions: ({ props }) => {
    if (typeof props.dimensions === 'object') {
      return { width: `${ props.dimensions.width }px`, height: `${ props.dimensions.height }px` };
    } else {
      return isDevice()
        ? { width:  '100%', height: `${ DEFAULT_POPUP_SIZE.HEIGHT }px` }
        : { width:  `${ DEFAULT_POPUP_SIZE.WIDTH }px`, height: `${ DEFAULT_POPUP_SIZE.HEIGHT }px` };
    }
  },
  prerenderTemplate: ({ doc, frame, props }) => {
    const { nonce } = props;
    return (
      <SpinnerPage
        nonce={ nonce }
      />
    ).render(dom({ doc }));
  },

  containerTemplate: ({ context, close, focus, doc, event, frame, prerenderFrame, props }) => {
    const { nonce } = props;
    const content = {
      windowMessage:   "Don't see the secure Safepay browser? We'll help you re-launch the window to complete your purchase",
      continueMessage: 'Click to Continue'
    }
    return (
      <Overlay
        context={ context }
        close={ close }
        focus={ focus }
        event={ event }
        frame={ frame }
        prerenderFrame={ prerenderFrame }
        content={ content }
        nonce={ nonce }
      />
    ).render(dom({ doc }));
  },


  props: {
    tracker: {
      required: true,
      queryParam: true,
      type: 'string'
    },
    tbt: {
      required: true,
      queryParam: true,
      type: 'string'
    },
    env: {
      required: true,
      queryParam: "environment",
      type: 'string'
    },
    xcomponent: {
      type:       'string',
      queryParam: true,
      value:      () => '1'
    },
    onSuccess: {
      type: 'function',
      required: true,
      default: () => {
        console.log('payment complete')
      },
      decorate({ close, value = noop }) {
        return (...args) => {
          value(...args)
          close()
        }
      }
    },
    onCancel: {
      type: 'function',
      required: false,
      default: () => {
        console.log('payment cancelled')
      },
      decorate({ close, value = noop }) {
        return (...args) => {
          value(...args)
          close()
        }
      }
    },
  },

})