// const express = require("express");
// const axios = require("axios");
// const {logRequestResponse, createLoggerWithPrefix} = require("../utils/logger");
// const router = express.Router();

// router.use(logRequestResponse);

// const logger = createLoggerWithPrefix("Toy Service");

// router.get("/all/:location", async(req, resp) => {
//     let location = req.params.location;
//     let backendResp;
//     try{
//         backendResp = await axios.get("http://127.0.0.1:8080/food");
//         resp.status(200).json(backendResp.data);
//     } catch(e){
//         logger.error("Could not connect to backend for getting bike details. ERROR:\n"+e);
//         resp.status(500).json({
//             error: "Internal Server Error",
//             detail: "Unable to connect to the backend"
//         });
//     }
// });

// router.get("/team", async(req, resp) =>{

//     let backendResp;
//     try{
//         backendResp = await axios.get("");
//         resp.status(200).json(backendResp.data);
//     } catch(e){
//         logger.error("Could not connect to backend for getting bike team details\n. ERROR:", e);
//         resp.status(500).json({
//             error: "Internal Server Error",
//             detail: "Unable to connect to the backend"
//         });
//     }
// });

// module.exports = router;

const express = require("express");
const axios = require("axios");
const {logRequestResponse, createLoggerWithPrefix} = require("../utils/logger");
const router = express.Router();
const Constants = require("../Constants/constants");
const ErrorMessages = require("../Constants/errorMessages");

router.use(logRequestResponse);

const logger = createLoggerWithPrefix("TOY Service");

router.get(Constants.APPLICATION_ROUTES.TOY_ROUTES.ALL_TOY, async(req, resp) => {
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
        backendUrl = `${Constants.ENV.HOST_TOYS}/all/${location}`;
        console.log(backendUrl);
        
        backendResp = await axios.get(backendUrl);
        resp.status(200).json(backendResp.data);
    } catch(e){
        logger.error("Could not connect to backend for getting toy details. ERROR:\n"+e);
        resp.status(500).json({
            error: ErrorMessages.ERROR.INTERNAL_SERVER_ERROR,
            detail: ErrorMessages.DETAIL.BACKEND_CONNECTION_FAILURE
        });
    }
});

router.get(Constants.APPLICATION_ROUTES.TOY_ROUTES.TOY_TEAM, async(req, resp) =>{

    let backendResp;
    try{
        //TODO: Get axios URL from env
        backendResp = await axios.get(Constants.ENV.HOST_TOYS + "/teams");
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