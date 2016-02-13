'use strict';

module.exports = function (grunt) {
	grunt.initConfig({
		jscs: {
			src: [
				'index.js'
			],
			options: {
				config: '.jscsrc'
			}
		},
		jshint: {
			files: {
				src: [
					'Gruntfile.js',
					'index.js'
				]
			},
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-summary')
			}
		},
		eslint: {
			src: {
				src: '<%= jshint.files.src %>'
			},
			options: {
				config: '.eslintrc',
				// format: require('eslint-stylish-config')
			}
		},
		lintspaces: {
			src: [
				'Gruntfile.js',
				'.jshintrc',
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
		'jscs',
		'jshint',
		'eslint',
		'lintspaces'
	]);
};
