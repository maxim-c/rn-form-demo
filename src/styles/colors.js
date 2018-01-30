const diagonally = {
  start: { x: 0, y: 0.3 },
  end: { x: 1, y: 0.5 },
};

export default {
  primary: '#434387',
  primaryLight: '#6668A7',
  primaryDark: '#332E5D',
  accent: '#1CC100',
  accentAlt: '#FB637E',
  primaryText: '#F8F8F8',
  error: '#FB637E',
  text: '#332E5D',
  borderColor: '#BFB8AF',
  inputBG: '#FFFFFF',
  placeholder: '#D7D2CB',
  dAccentGradient: {
    ...diagonally,
    locations: [0.1, 0.9],
    colors: ['#2e7d0f', '#1CC100' ]
  },
  dPrimaryGradient: {
    ...diagonally,
    locations: [0, 1],
    colors: ['#6668A7', '#332E5D']
  }
};