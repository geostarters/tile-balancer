// @flow
"use strict";
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

const readFileAsync = promisify(fs.readFile);

function extractIndex(id) {

	const myRegexp = /\((\d+),\s(\d+),\s(\d+)\)/;
	const match = myRegexp.exec(id);
	return {x: match[1], y: match[2], z: match[3]};

}

const crearIndices = async () => {

	const tilesIndex = {};
	const minZoom = 7;
	const maxZoom = 15;

	for (let i = minZoom; i <= maxZoom; i++) {

		tilesIndex[i] = {};
		const tiles = await readFileAsync(path.join("src", "assets", `tiles${i}.geojson`));
		const tilesJson = JSON.parse(tiles);
		tilesJson.features.forEach(feature => {

			const id = (feature.properties.id) ? feature.properties.id : feature.id;
			const index = extractIndex(id);
			if (tilesIndex[i].hasOwnProperty(index.x)) {

				tilesIndex[i][index.x][index.y] = feature.properties.limit;

			} else {

				tilesIndex[i][index.x] = {};
				tilesIndex[i][index.x][index.y] = feature.properties.limit;

			}

		});

	}

	return tilesIndex;

};

crearIndices().then((indices) => {

	console.log("indices", indices);
	fs.writeFile(path.join("src", "assets", "indices.json"), JSON.stringify(indices), () => {

		console.log("creado");

	});

});
