// @flow
"use strict";

class QuadTree {

	static getChildens(zoom: number, x: number, y: number) {

		const z = zoom + 1;
		const w = x * 2;
		const e = w + 1;
		const n = y * 2;
		const s = n + 1;
		return {
			nw: {x: w, y: n, z: z},
			ne: {x: e, y: n, z: z},
			sw: {x: w, y: s, z: z},
			se: {x: e, y: s, z: z},
		};

	}

	static getParent(zoom: number, x: number, y: number) {

		const z = zoom - 1;
		const px = Math.floor(x / 2);
		const py = Math.floor(y / 2);
		return {
			x: px,
			y: py,
			z: z,
		};

	}

}

module.exports = QuadTree;
