/** @jsx node */

import { create, CONTEXT } from 'zoid/src'
import { noop } from '@krakenjs/belter/src';
import { Config } from '../../configs/index.js'
import { containerTemplate } from './container.jsx'
import { VALID_MODES, VALID_SIZES, VALID_VARIANTS } from '../../constants/button.js'
import { isAmountValid, isCurrencyValid } from './utils.js'

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
      required: true
    },
    orderId: {
      type: 'string',
      required: false,
      queryParam: "order_id",
    },
    source: {
      type: 'string',
      queryParam: true,
      default: () => {
        return 'checkout'
      }
    },
    client: {
      type: 'object',
      required: true,
      validate: ({ value, props }) => {
        const { env } = props;
        if (!value[env]) {
          throw new Error(`Client ID not found for env ${env}`)
        }
      },
    },
    style: {
      type: 'object',
      required: true,
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

    beforePayment: {
      type: 'function',
      required: false,
      default: () => {
        console.log('no default pre payment validation')
      }
    },

    payment: {
      type: 'object',
      required: true,
      validate: ({ value, props }) => {
        const { amount, currency } = value
        const amountErr = isAmountValid(amount)
        if (amountErr) {
          throw amountErr
        }

        const currencyErr = isCurrencyValid(currency)
        if (currencyErr) {
          throw currencyErr
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

    onPayment: {
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
    }
  }
})