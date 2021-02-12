// @flow
"use strict";

const Router = require("express").Router;
const utilsService = require("../services/utilsService.js");

module.exports = () => {

	const utils = new Router();

	utils.get("/getbbox/:z/:x/:y", async (req, res) => {

		console.log("Get");
		const z = req.params.z;
		const x = req.params.x;
		const y = req.params.y;
		console.log("Get", req.params);

		res.setHeader("Content-Type", "application/json");

		const bbox = await utilsService.getBbox(x, y, z);
		res.json({"text": `GET: it works! ${bbox}`});

	});

	utils.get("/incatalonia/:z/:x/:y", async (req, res) => {

		console.log("Get");
		const z = req.params.z;
		const x = req.params.x;
		const y = req.params.y;
		console.log("Get", req.params);

		res.setHeader("Content-Type", "application/json");

		const inCat = await utilsService.inCatalonia(x, y, z);
		res.json({"text": `GET: it works! ${inCat}`});

	});

	utils.get("/touchCatalonia/:z/:x/:y", async (req, res) => {

		console.log("Get");
		const z = req.params.z;
		const x = req.params.x;
		const y = req.params.y;
		console.log("Get", req.params);

		res.setHeader("Content-Type", "application/json");

		const inCat = await utilsService.touchCatalonia(x, y, z);
		res.json({"text": `GET: it works! ${inCat}`});

	});

	return utils;

};
