import { BUTTON_SIZES } from "../../../constants/index.js"

export const BUTTON_SIZE_STYLE = {
  [BUTTON_SIZES.SMALL]: {
    defaultWidth:    200,
    defaultHeight:   108,
    minWidth:        200,
    maxWidth:        320,
    minHeight:       48,
    maxHeight:       150
  },

  [BUTTON_SIZES.MEDIUM]: {
    defaultWidth:      250,
    defaultHeight:     116,
    minWidth:          250,
    maxWidth:          400,
    minHeight:         56,
    maxHeight:         150
  },

  [BUTTON_SIZES.LARGE]: {
    defaultWidth:      350,
    defaultHeight:     124,
    minWidth:          350,
    maxWidth:          500,
    minHeight:         60,
    maxHeight:         150
  }
}