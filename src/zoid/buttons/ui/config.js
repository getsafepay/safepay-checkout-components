import { BUTTON_SIZES } from "../../../constants/index.js"

export const BUTTON_SIZE_STYLE = {
  [BUTTON_SIZES.SMALL]: {
    defaultWidth:    150,
    defaultHeight:   92,
    minWidth:        150,
    maxWidth:        320,
    minHeight:       48,
    maxHeight:       100
  },

  [BUTTON_SIZES.MEDIUM]: {
    defaultWidth:      250,
    defaultHeight:     100,
    minWidth:          200,
    maxWidth:          400,
    minHeight:         56,
    maxHeight:         108
  },

  [BUTTON_SIZES.LARGE]: {
    defaultWidth:      350,
    defaultHeight:     124,
    minWidth:          300,
    maxWidth:          500,
    minHeight:         60,
    maxHeight:         132
  }
}