'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		eslint: {
			src: {
				src: 'index.js'
			},
			options: {
				config: '.eslintrc',
				format: require('eslint-stylish-config')
			}
		},
		lintspaces: {
			src: [
				'Gruntfile.js',
				'index.js'
			],
			options: {
				editorconfig: '.editorconfig',
				ignores: ['js-comments']
			}
		}
	});

	// Load any grunt plugins found in package.json.
	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
	require('time-grunt')(grunt);

	grunt.registerTask('default', [
		'eslint',
		'lintspaces'
	]);
};
