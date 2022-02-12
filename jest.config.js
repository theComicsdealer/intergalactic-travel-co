module.exports = {
	clearMocks: true,
	moduleFileExtensions: ['js'],
	roots: ['<rootDir>'],
	testEnvironment: 'node',
	globalSetup: '<rootDir>/tests/global-setup.js',
	globalTeardown: '<rootDir>/tests/global-teardown.js'
};
