module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.test.json',
    },
  },
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  rootDir: './',
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>src/mocks/fileMock.ts',
  },
  collectCoverageFrom: [
    'src/**/*.tsx',
    '!src/pages/_app.tsx',
    '!src/pages/index.tsx',
    '!src/pages/_document.tsx',
    '!src/layout/index.tsx',
    '!src/pages/404.tsx',
    '!src/pages/NotFound/index.tsx',
    '!src/components/ErrorBoundary/index.tsx',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-dom', './jest.setup.ts'],
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};
