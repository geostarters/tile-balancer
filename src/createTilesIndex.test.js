// @flow
"use strict";

const utilsService = require("./services/utilsService");

describe("Test index", ()=>{

	test("index [7][64][47] true", () => {

		const index = utilsService.tileInIndex(64, 47, 7);
		expect(index).toBe(2);

	});

	test("index 10/514/377 true", () => {

		const index = utilsService.tileInIndex(514, 377, 10);
		expect(index).toBe(2);

	});

	test("index 10/515/378 true", () => {

		const index = utilsService.tileInIndex(515, 378, 10);
		expect(index).toBe(1);

	});

	test("index 10/514/378 true", () => {

		const index = utilsService.tileInIndex(514, 378, 10);
		expect(index).toBe(2);

	});

	test("index 10/512/376 true", () => {

		const index = utilsService.tileInIndex(512, 376, 10);
		expect(index).toBe(0);

	});
});
