module.exports = {
  presets: [
    require('../../tailwind-preset.config.js')
  ],
  theme: {
    extend: {
      minHeight: {
        '56': '56px',
        '40': '40px',
        'footer': '64px',
      },
      maxHeight: {
        'image': '360px'
      },
      maxWidth: {
        'image': '640px'
      },
      transitionProperty: {
        'height': 'height'
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    }
  }
};
