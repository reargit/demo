module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(@react-navigation|@react-native|react-native|react-native-video|react-native-safe-area-context)/)',
  ],
};
