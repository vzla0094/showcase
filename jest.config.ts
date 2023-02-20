import path from 'path'

export default async () => {
  return {
    preset: 'jest-expo',
    rootDir: '.',
    moduleNameMapper: {
      // add the necessary mapping for aliases
      'firebase/auth/react-native$': path.resolve(
        __dirname,
        'node_modules/@firebase/auth/dist/rn'
      ),
    },
    transformIgnorePatterns: [
      'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|@?ptomasroos/react-native-multi-slider)',
    ],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    setupFiles: ['./setupTests.js'],
    coveragePathIgnorePatterns: [
      '/node_modules/',
      'src/media/*',
      'src/models/*',
      'src/navigations/*',
      'src/redux/*',
    ],
  }
}
