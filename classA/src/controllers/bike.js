const express = require("express");
const axios = require("axios");
const {logRequestResponse, createLoggerWithPrefix} = require("../utils/logger");
const router = express.Router();

router.use(logRequestResponse);

const logger = createLoggerWithPrefix("Bike Service");

router.get("/all/:location", async(req, resp) => {
    let location = req.params.location;
    let backendResp;
    try{
        backendResp = await axios.get("https://restcountries.com/v3.1/name/deutschland");
        resp.status(200).json(backendResp.data);
    } catch(e){
        //TODO: Logger for error
        logger.error("Could not connect to backend for getting bike details. ERROR:\n"+e);
        resp.status(500).json({
            error: "Internal Server Error",
            detail: "Unable to connect to the backend"
        });
    }
});

router.get("/team", async(req, resp) =>{

    let backendResp;
    try{
        backendResp = await axios.get("");
        resp.status(200).json(backendResp.data);
    } catch(e){
        //TODO: Logger for error
        logger.error("Could not connect to backend for getting bike team details\n. ERROR:", e);
        resp.status(500).json({
            error: "Internal Server Error",
            detail: "Unable to connect to the backend"
        });
    }
});

module.exports = router;