// @flow
"use strict";

const QuadTree = require("./quadtree");

describe("Test index", ()=>{

	test("children 0/0/0", () => {

		const index = QuadTree.getChildens(0, 0, 0);
		expect(index.se.x).toBe(1);
		expect(index.se.y).toBe(1);

	});

	test("children 10/514/377", () => {

		const index = QuadTree.getChildens(10, 514, 377);
		expect(index.nw.x).toBe(1028);
		expect(index.nw.y).toBe(754);
		expect(index.se.x).toBe(1029);
		expect(index.se.y).toBe(755);

	});

	test("parents 10/514/377", () => {

		const nw = QuadTree.getParent(11, 1028, 754);
		const ne = QuadTree.getParent(11, 1029, 754);
		const sw = QuadTree.getParent(11, 1028, 755);
		const se = QuadTree.getParent(11, 1029, 755);

		expect(nw).toMatchObject({x: 514, y: 377, z: 10});
		expect(ne).toMatchObject({x: 514, y: 377, z: 10});
		expect(sw).toMatchObject({x: 514, y: 377, z: 10});
		expect(se).toMatchObject({x: 514, y: 377, z: 10});

	});

	test("parent 10/514/377", () => {

		const index = QuadTree.getParent(10, 514, 377);
		expect(index.x).toBe(257);
		expect(index.y).toBe(188);

	});

	test("parent 9/257/188", () => {

		const index = QuadTree.getParent(9, 257, 188);
		expect(index.x).toBe(128);
		expect(index.y).toBe(94);

	});

});
