const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {
    	outline: {
    		input: `1px solid ${colors.blue['600']}`,
        error: `1px solid ${colors.red['600']}`
    	}
    },
  },
  variants: {},
  plugins: [],
}