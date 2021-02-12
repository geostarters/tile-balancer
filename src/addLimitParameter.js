// @flow
"use strict";
const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

const readFileAsync = promisify(fs.readFile);
const i = process.argv[2];

const addLimit = async (i) => {

	const tiles = await readFileAsync(path.join("src", "assets", `tiles${i}.geojson`));
	const tilesl = await readFileAsync(path.join("src", "assets", `tiles${i}l.geojson`));

	const tilesJson = JSON.parse(tiles);
	const tileslJson = JSON.parse(tilesl);

	const tilesp = tilesJson.features.map((tile) => {
		if (tileslJson.features.find((element) => {
			
			return element.properties.title === tile.properties.title;
		
		})) {

			tile.properties.limit = true;
		
		} else {
			
			tile.properties.limit = false;
		
		}
		return tile;
	
	});
	return tilesp;

};

addLimit(i).then((tiles) => {

	const geojson = {type: "FeatureCollection",
		name: `tiles${i}`,
		features: tiles};
	fs.writeFile(path.join("src", "assets", `tiles${i}p.geojson`), JSON.stringify(geojson), () => {

		console.log("creado");

	});

});
