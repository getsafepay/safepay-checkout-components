# Safepay Checkout and Button

A set of components allowing easy integration of Safepay Button and Safepay Checkout into your website, powered by [zoid](https://github.com/krakenjs/zoid)

## Prerequisites

This integration sets up online payment options using this library, which presents the Safpepay Button to your buyers.

Complete the steps in Get started to get the following sandbox information from the Developer Dashboard

- Email ID and password of a sandbox account, to login and verify a checkout purchase
- Sandbox API key of your Safepay sandbox account

## Technical flow

1. You add the payment button to your webpage
2. Your buyer clicks a button
3. The button calls the Safepay Order API to set up a payment session
4. The button launches the Safepay Checkout experience
5. The buyer approves the payment
6. The button calls the Safepay Order API to finalize the transaction
7. You show a confirmation message to your buyer

## Installation

You can install the Safepay Checkout Components library either through NPM or Yarn, or include the library inside a `script` tag in your `index.html` file. Both options are described below

### A. Install through NPM or Yarn

In your project root you can run either one of the below commands (depending on what package manager you use)

NPM

```bash
npm i --save @sfpy/checkout-components
```

Yarn

```bash
yarn add @sfpy/checkout-components
```

### B. Add a script tag

```html
<html>
  <head>
    <!-- ..... -->
    <script src="https://unpkg.com/@sfpy/checkout-components@0.0.8/dist/sfpy-checkout.js"></script>
    <!-- ..... -->
  </head>
  <body>
    <!-- ..... -->
  </body>
</html>
```

You can choose whichever version suits your integration from the [releases](https://github.com/getsafepay/safepay-checkout-components/releases)

## Integration

To accept payments on your website, after you've successfuly installed the Safepay Checkout Components library, You'll have to add buttons to your website. We also have a fully working demo on the [Quick Start Guide](https://safepaydocs.netlify.app).

Support for all the popular frameworks like React, Angular and Vue comes out of the box but you can also use Vanilla javascript as showb below.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Safepay checkout demo</title>
    <script
      type="text/javascript"
      src="https://unpkg.com/@sfpy/checkout-components@0.0.8/dist/sfpy-checkout.js"
    ></script>
  </head>
  <body>
    <!-- Set up a container element for the button -->
    <div id="safepay-button-container"></div>
    <script>
      safepay
        .Button({
          env: "sandbox",
          client: {
            sanbox: "sec_733defcf-835f-4cd1-99fd-b3e62dd83fe0",
          },
          style: {
            mode: "light", // dark or light
            size: "large", // small medium large
            variant: "primary", // primary dark
          },
          orderId: "12344", // Your custom order ID
          // Details to set up the transaction
          // when a payment button is clicked
          payment: {
            currency: "PKR",
            amount: 1000.5,
          },
          // Finalize the transaction after payer approval
          onPayment: function (data) {
            // At this point your customer has approved the payment
            // and you can show a success message or make an API request
            // to your servers to add the data.
            return fetch(`/api/orders/mark-paid`, {
              method: "post",
            });
          },
          onCancel: function () {
            console.log("cancelled");
          },
        })
        .render("#safepay-button-container");
    </script>
  </body>
</html>
```

### Props

The Safepay Checkout Button expects the following props to be passed to it in order to your configure a purchase for your buyer

| Name        | Type       | Required | Description                                                                                                                                                                   |
| :---------- | :--------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `env`       | `string`   | `true`   | One of two possible values `sandbox` or `production`                                                                                                                          |
| `client`    | `object`   | `true`   | A map of `env` to your api key. Each value in the map must correspond to the api key for the correct environment                                                              |
| `style`     | `object`   | `true`   | A few options to configure the look and feel of the button                                                                                                                    |
| `orderId`   | `string`   | `false`  | An option value in case you want to link your store's order ID with this payment                                                                                              |
| `payment`   | `object`   | `true`   | Amount and currency values to configure the payment when your customer clicks a button                                                                                        |
| `onPayment` | `function` | `true`   | A callback to notify you when your customer has completed the payment. This function is passed in the Transaction object through the `payment` attribute on the `data` object |
| `onCancel`  | `function` | `true`   | A callback to notify you when your customer cancels the payment or abandons it. At this point you're free to take them back to the shopping cart page for instance            |

### React Integration

Since we're huge fans of React at Safepay, we've integrated this library into our products like Quick Links through the following React integration that ships out of the box with this library

```jsx
import safepay from "@sfpy/checkout-components";
import React from "react";
import ReactDOM from "react-dom";

const SafepayButtonInstance = safepay.Button.driver("react", {
  React: React,
  ReactDOM: ReactDOM,
});

export default SafepayButtonInstance;
```

And then in another file you import `SafepayButtonInstance` and render is using familiar React and JSX.

```jsx
import SafepayButtonInstance from './safepay-button-intance'

const MyCheckoutPage = ({ orderId }) => (
  <div>
    <p>Checkout for order id {orderId}</p>
    <SafepayButtonInstance
      env={'sandbox'}
      client={{
        'sandbox': 'sec_733defcf-835f-4cd1-99fd-b3e62dd83fe0'
      }}
      style={{
        mode: 'light',
        size: 'medium',
        variant: 'primary'
      }}
      orderId={"12344"},
      payment={{
        "currency": "PKR",
        "amount": 1000.50
      }}
      onPayment={(data) => {
        // At this point your customer has approved the payment
        // and you can show a success message or make an API request
        // to your servers to add the data.
        return fetch(`/api/orders/mark-paid`, {
          method: "post",
        })
      }}
      onCancel={() => {
        console.log('payment cancelled')
      }}
    />
  </div>
)
```

## Local development

If you want to contribute or you're looking to run the demo included in this package, please read on.

1. Clone this repository on your local machine

```bash
git clone https://github.com/getsafepay/safepay-checkout-components.git
```

2. `cd` into the directory and install `node_modules`

```bash
~/safepay-checkout-components: yarn install
```

3. To run the demo, run `yarn run serve` or `npm run serve` and follow the instructions printed on the terminal
