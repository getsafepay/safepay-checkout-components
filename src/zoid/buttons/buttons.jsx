/** @jsx node */

import { create, CONTEXT } from 'zoid/src'
import { noop } from '@krakenjs/belter/src';
import { Config } from '../../configs/index.js'
import { containerTemplate } from './container.jsx'
import { VALID_MODES, VALID_SIZES, VALID_VARIANTS } from '../../constants/button.js'

export const Button = create({
  tag: 'safepay-button',
  url: ({ props }) => Config.buttonUrls[props.env],

  autoResize: {
    width:  true,
    height: true
  },

  domain: Config.safepayDomainRegex,

  bridgeUrl: ({ props }) => Config.metaFrameUrls[props.env],

  containerTemplate,

  defaultContext: CONTEXT.IFRAME,


  props: {
    env: {
      type: 'string',
      required: true,
      queryParam: true
    },
    style: {
      type: 'object',
      required: false,
      queryParam: true,
      serialization: 'dotify',
      validate: function({ value, props }) {
        if (value.mode && VALID_MODES.indexOf(value.mode) === -1) {
          throw new Error(`Invalid mode. Must be one of ${VALID_MODES.join(",")}`)
        }
        if (value.size && VALID_SIZES.indexOf(value.size) === -1) {
          throw new Error(`Invalid size. Must be one of ${VALID_SIZES.join(",")}`)
        }
        if (value.variant && VALID_VARIANTS.indexOf(value.variant) === -1) {
          throw new Error(`Invalid variant. Must be one of ${VALID_VARIANTS.join(",")}`)
        }
      }
    },
    onPayment: {
      type: 'function',
      required: true,
      default: () => {
        console.log('please implement this function')
      }
    },
    onCompletePayment: {
      type: 'function',
      required: false,
      default: () => {
        console.log('payment complete')
      },
      decorate({ value = noop }) {
        return (...args) => {
          value(...args)
        }
      }
    },
    onCancel: {
      type: 'function',
      required: false,
      default: () => {
        console.log('payment cancelled')
      }
    },
  },
})