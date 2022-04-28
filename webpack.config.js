import { getWebpackConfig } from './webpack/builder.js';
import globals from './globals.js'

const CHECKOUT_FILE_NAME = 'sfpy-checkout';
const MODULE_NAME = 'safepay';

const config = getWebpackConfig({
  context: process.cwd(),
  entry: './src/index.js',
  filename: `${ CHECKOUT_FILE_NAME }.js`,
  modulename: MODULE_NAME,
  libraryTarget: 'umd',
  vars: globals
})

export default [ config ]