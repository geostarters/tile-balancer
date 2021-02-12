// @flow
"use strict";
const jimp = require("jimp");
const path = require("path");
const utilsService = require("./utilsService");

async function merge() {

	const z = 11;
	const x = 1026;
	const y = 763;
	const yt = utilsService.getTMS(y, z);

	const outerImg = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;

	console.log(outerImg);

	const innerImg = `https://geoserveis.icgc.cat/icc_mapesmultibase/noutm/wmts/orto/GRID3857/${z}/${x}/${y}.png`;
	const maskImg = `http://imtilemapsdev.icgc.local/tileserver/tileserver.php/cat_black/${z}/${x}/${y}.png`;

	const path1 = path.join(__dirname, "mask.png");
	const path2 = path.join(__dirname, "final.png");

	const outImage = await jimp.read(outerImg);
	const inImage = await jimp.read(innerImg);
	const mascara = await jimp.read(maskImg);

	outImage.mask(mascara);
	outImage.writeAsync(path1);

	inImage.blit(outImage, 0, 0);
	inImage.writeAsync(path2);
	
	
}

async function carga() {

	const image = "http://www.ideandorra.ad/Serveis/gwc/service/wmts?layer=fons&style=&tilematrixset=Andorra_4326&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/jpeg&TileMatrix=Andorra_4326_2:12&TileCol=2073&TileRow=1500";

	const path2 = path.join(__dirname, "carga.png");
	const outImage = await jimp.read(image);
	outImage.writeAsync(path2);

}

//merge();
carga();
