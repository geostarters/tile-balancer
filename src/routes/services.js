// @flow
"use strict";

const Router = require("express").Router;
const path = require("path");
const imageService = require("../services/imageService");

module.exports = () => {

	const services = new Router();

	services.get("/:tipus/:z/:x/:y", async (req, res) => {

		const tipus = req.params.tipus;
		const z = req.params.z;
		const x = req.params.x;
		const y = path.parse(req.params.y).name;

		let urlInner = `https://geoserveis.icgc.cat/icc_mapesmultibase/noutm/wmts/topo/GRID3857/${z}/${x}/${y}.jpeg`;
		let urlOuter = `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
		const urlMask = `https://tilemaps.icgc.cat/tileserver/tileserver.php/contorn_cat_negre/${z}/${x}/${y}.png`;
		switch (tipus) {

		case "orto":
			urlInner = `https://geoserveis.icgc.cat/icc_mapesmultibase/noutm/wmts/orto/GRID3857/${z}/${x}/${y}.png`;
			urlOuter = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
			break;
		case "terreny":
			//urlInner = `https://tilemaps.icgc.cat/tileserver/tileserver.php/terrarium_catalunya_2m/${z}/${x}/${y}.png`;
			urlInner = `https://tilemaps.icgc.cat/tileserver/tileserver.php/terrarium_4/${z}/${x}/${y}.png`;
			//urlInner = `https://tilemaps.icgc.cat/tileserver/tileserver.php/mapboxTerrain/${z}/${x}/${y}.png`;
			urlOuter = `https://s3.amazonaws.com/elevation-tiles-prod/terrarium/${z}/${x}/${y}.png`;
			break;
		case "simple":
			urlInner = `https://tilemaps.icgc.cat/mapfactory/wmts/osm_suau/CAT3857_15/${z}/${x}/${y}.png`;
			urlOuter = [`https://www.ign.es/wmts/mapa-raster?request=getTile&layer=MTN&TileMatrixSet=GoogleMapsCompatible&TileMatrix=${z}&TileCol=${x}&TileRow=${y}&format=image/jpeg`, `http://tile.openstreetmap.org/${z}/${x}/${y}.png`];
			break;
		case "hybrid":
			urlInner = [`https://geoserveis.icgc.cat/icc_mapesmultibase/noutm/wmts/orto/GRID3857/${z}/${x}/${y}.png`, `https://tilemaps.icgc.cat/mapfactory/wmts/hibrida_total/CAT3857/${z}/${x}/${y}.png`, `https://tilemaps.icgc.cat/mapfactory/wmts/toponimia/CAT3857/${z}/${x}/${y}.png`];
			urlOuter = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
			break;

		}

		const imgMerged = await imageService.createHibridService(x, y, z, urlInner, urlOuter, urlMask);

		if (imgMerged.type === "url") {

			res.redirect(imgMerged.url);

		} else {

			res.contentType("image/png");
			res.send(imgMerged.image);

		}

	});

	return services;

};
