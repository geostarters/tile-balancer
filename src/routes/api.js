// @flow
"use strict";

const Router = require("express").Router;
const utilsRoutes = require("./utils");
const servicesRoutes = require("./services");

module.exports = () => {

	const api = new Router();

	api.use("/utils/", utilsRoutes());
	api.use("/services/", servicesRoutes());

	return api;

};

