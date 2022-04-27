import { ENV } from './constants.js';

export const Config = {

	env: ENV.LOCAL,

	checkoutUris: {
		[ ENV.LOCAL ]: "/pay",
		[ ENV.DEV ]: "/checkout/pay",
		[ ENV.SANDBOX ]: "/checkout/pay",
		[ ENV.PRODUCTION ]: "/checkout/pay"
	},

	buttonUris: {
		[ ENV.LOCAL ]: "",
		[ ENV.DEV ]: "/button",
		[ ENV.SANDBOX ]: "/button",
		[ ENV.PRODUCTION ]: "/button"
	},

	postBridgeUris: {
    [ ENV.LOCAL ]:      "?xcomponent=1",
    [ ENV.DEV ]:      	"/bridge?xcomponent=1",
    [ ENV.SANDBOX ]:    "/bridge?xcomponent=1",
    [ ENV.PRODUCTION ]: "/bridge?xcomponent=1",
  },

  get safepayDomainRegex() {
  	return /\.?(getsafepay|localhost)\.?(com)?(:\d+)?$/
  },

	get buttonDomains() {
		return {
			[ ENV.LOCAL ]: "http://localhost:3000",
			[ ENV.DEV ]: "https://dev.api.getsafepay.com",
			[ ENV.SANDBOX ]: "https://sandbox.api.getsafepay.com",
			[ ENV.PRODUCTION ]: "https://www.getsafepay.com"
		}
	},

	get checkoutDomains() {
		return {
			[ ENV.LOCAL ]: "http://localhost:3001",
			[ ENV.DEV ]: "https://dev.api.getsafepay.com",
			[ ENV.SANDBOX ]: "https://sandbox.api.getsafepay.com",
			[ ENV.PRODUCTION ]: "https://www.getsafepay.com"
		}	
	},

	get bridgeDomains() {
		return {
			[ ENV.LOCAL ]: "http://localhost:3020",
			[ ENV.DEV ]: "https://dev.api.getsafepay.com",
			[ ENV.SANDBOX ]: "https://sandbox.api.getsafepay.com",
			[ ENV.PRODUCTION ]: "https://www.getsafepay.com"
		}
	},

	get checkoutUrls() {
		let spUrls = Config.checkoutDomains
		let checkoutUris = Config.checkoutUris

		return {
			[ ENV.LOCAL ]: `${spUrls.local}${checkoutUris.local}`,
			[ ENV.DEV ]: 		`${spUrls.development}${checkoutUris.development}`,
			[ ENV.SANDBOX ]: `${spUrls.sandbox}${checkoutUris.sandbox}`,
			[ ENV.PRODUCTION ]: `${spUrls.production}${checkoutUris.production}`	
		}
	},

	get buttonUrls() {
		let spUrls = Config.buttonDomains
		let buttonUris = Config.buttonUris

		return {
			[ ENV.LOCAL ]: `${spUrls.local}${buttonUris.local}`,
			[ ENV.DEV ]: 	`${spUrls.development}${buttonUris.development}`,
			[ ENV.SANDBOX ]: `${spUrls.sandbox}${buttonUris.sandbox}`,
			[ ENV.PRODUCTION ]: `${spUrls.production}${buttonUris.production}`
		}
	},

	get metaFrameUrls() {
    let spUrls = Config.bridgeDomains;
    let postBridgeUris = Config.postBridgeUris;

    return {
      [ ENV.LOCAL ]:      `${ spUrls.local }${ postBridgeUris.local }`,
      [ ENV.DEV ]:      	`${ spUrls.development }${ postBridgeUris.development }`,
      [ ENV.SANDBOX ]:    `${ spUrls.sandbox }${ postBridgeUris.sandbox }`,
      [ ENV.PRODUCTION ]: `${ spUrls.production }${ postBridgeUris.production }`
    };
  }
}