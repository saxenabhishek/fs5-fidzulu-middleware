const express = require("express");
const axios = require("axios");
const {logRequestResponse, createLoggerWithPrefix} = require("../utils/logger");
const router = express.Router();
const Constants = require("../Constants/constants");
const ErrorMessages = require("../Constants/errorMessages");

router.use(logRequestResponse);

const logger = createLoggerWithPrefix("Bike Service");

router.get(Constants.APPLICATION_ROUTES.BIKE_ROUTES.ALL_BIKES, async(req, resp) => {
    let location = req.params.location;
    let backendResp;
    try{
        //TODO: Axios URL from env
        backendResp = await axios.get(Constants.ENV.HOST_BIKES);
        resp.status(200).json(backendResp.data);
    } catch(e){
        logger.error("Could not connect to backend for getting bike details. ERROR:\n"+e);
        resp.status(500).json({
            error: ErrorMessages.ERROR.INTERNAL_SERVER_ERROR,
            detail: ErrorMessages.DETAIL.BACKEND_CONNECTION_FAILURE
        });
    }
});

router.get(Constants.APPLICATION_ROUTES.BIKE_ROUTES.BIKES_TEAM, async(req, resp) =>{

    let backendResp;
    try{
        //TODO: Get axios URL from env
        backendResp = await axios.get(Constants.ENV.HOST_BIKES);
        resp.status(200).json(backendResp.data);
    } catch(e){
        logger.error("Could not connect to backend for getting bike team details\n. ERROR:", e);
        resp.status(500).json({
            error: ErrorMessages.ERROR.INTERNAL_SERVER_ERROR,
            detail: ErrorMessages.DETAIL.BACKEND_CONNECTION_FAILURE
        });
    }
});

module.exports = router;