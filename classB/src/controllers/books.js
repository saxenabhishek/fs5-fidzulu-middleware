const express = require("express");
const axios = require("axios");
const {logRequestResponse, createLoggerWithPrefix} = require("../utils/logger");
const router = express.Router();
const Constants = require("../Constants/constants");
const ErrorMessages = require("../Constants/errorMessages");

router.use(logRequestResponse);

const logger = createLoggerWithPrefix("Book Service");

router.get(Constants.APPLICATION_ROUTES.BOOK_ROUTES.ALL_BOOKS, async(req, resp) => {
    let location = req.params.location;
    console.log(location)
    if(location != "IN" && location!="IE" && location!="US-NC"){
        resp.status(Constants.HTTP_STATUS_CODE.PAGE_NOT_FOUND).json({
            error: ErrorMessages.ERROR.PAGE_NOT_FOUND,
            detail: ErrorMessages.DETAIL.UNKNOWN_COUNTRY
        })
        return;
    }
    let backendResp;
    try{
        //TODO: Axios URL from env
        backendUrl = `${Constants.ENV.HOST_BOOKS}/all/${location}`;
        console.log(backendUrl);
        
        backendResp = await axios.get(backendUrl);
        resp.status(200).json(backendResp.data);
    } catch(e){
        logger.error("Could not connect to backend for getting book details. ERROR:\n"+e);
        resp.status(500).json({
            error: ErrorMessages.ERROR.INTERNAL_SERVER_ERROR,
            detail: ErrorMessages.DETAIL.BACKEND_CONNECTION_FAILURE
        });
    }
});

router.get(Constants.APPLICATION_ROUTES.BOOK_ROUTES.BOOKS_TEAM, async(req, resp) =>{

    let backendResp;
    try{
        //TODO: Get axios URL from env
        backendUrl = `${Constants.ENV.HOST_BOOKS}/teams`;
        console.log(backendUrl);
        
        backendResp = await axios.get(backendUrl);
        resp.status(200).json(backendResp.data);
    } catch(e){
        logger.error("Could not connect to backend for getting book teams details\n. ERROR:", e);
        resp.status(500).json({
            error: ErrorMessages.ERROR.INTERNAL_SERVER_ERROR,
            detail: ErrorMessages.DETAIL.BACKEND_CONNECTION_FAILURE
        });
    }
});

module.exports = router;