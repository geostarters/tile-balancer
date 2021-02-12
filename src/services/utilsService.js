// @flow
"use strict";
const SphericalMercator = new (require("@mapbox/sphericalmercator"))();
const turf = require("@turf/turf");
const catPoly = require("../assets/catalunya_contorn_bad.json");
const catIndex = require("../assets/indices");

class UtilsService {

	static getBbox(x, y, zoom, tmsStyle = false, srs = "WGS84") {

		const bbox = SphericalMercator.bbox(x, y, zoom, tmsStyle, srs);
		return bbox;

	}

	static inCatalonia(x, y, zoom) {

		const bbox = this.getBbox(x, y, zoom);
		const poly = turf.bboxPolygon(bbox);
		const isIntersect = turf.booleanWithin(poly, catPoly.features[0]);
		const inCat = isIntersect;
		return inCat;

	}

	static touchCatalonia(x, y, zoom) {

		const bbox = this.getBbox(x, y, zoom);
		const poly = turf.bboxPolygon(bbox);
		const isIntersect = turf.intersect(poly, catPoly.features[0]);
		const inCat = !(isIntersect === null);
		return inCat;

	}

	static getTMS(y, z) {

		return Math.pow(2, z) - y - 1;

	}

	/**
	 *
	 * @returns 0 = out catalonia, 1 = in catalonia, 2 = limit catalonia
	 */
	static tileInIndex(x, y, zoom) {

		try {

			if (catIndex[zoom][x][y] === true || catIndex[zoom][x][y] === "1") {

				return 2;

			} else if (catIndex[zoom][x][y] === false || catIndex[zoom][x][y] === "0") {

				return 1;

			} else {

				return 0;

			}

		} catch (e) {

			return 0;

		}

	}

}

module.exports = UtilsService;
