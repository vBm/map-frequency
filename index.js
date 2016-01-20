#!/usr/bin/env node

'use strict';

// Local libs and files

var	argv = process.argv.slice(2);

var wotMaps = require('./data/wot-maps'),

// node modules defined in package.json

	clc = require('cli-color'),
	glob = require('glob'),
	Table = require('cli-table'),
	_ = require('lodash');

var gamePath;

if (!argv) {
	gamePath = '/**/';
} else {
	gamePath = argv;
}

glob(gamePath + '*.wotreplay', function (error, files) {
	if (_.size(files) > 0) {
		var nameRegex = /(\d+)\_\d+\_(.*)\_(\d+\_\D+)\.wotreplay/;
		var maps = [];

		files.forEach(function (entry) {
			if (nameRegex.exec(entry) !== null) {
				maps.push(nameRegex.exec(entry)[3]);
			}
		});

		var frequency = _.chain(maps).countBy().toPairs().sortBy(1).reverse().value();

		var processed = new Table({
			head: [],
			colWidths: [40, 10],
			style: {
				head: ['green']
			}
		});

		processed.push({'Number of replays processed:': clc.bold(_.size(files))});

		console.log(processed.toString());

		var table = new Table({
			head: ['Map name', 'count'],
			colWidths: [40, 10],
			style: {
				head: ['green']
			}
		});

		frequency.forEach(function (mapName) {
			table.push([wotMaps['maps'][mapName[0]], mapName[1]]);
		});

		console.log(table.toString());

	} else {
		console.log(clc.bold('There are no replays available for processing...\nAre you sure that you have enabled replay recording?'));
	}
});
