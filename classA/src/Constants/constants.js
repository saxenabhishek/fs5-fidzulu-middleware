require("dotenv").config()

const ENV = {
    PORT: process.env.PORT,
    HOST_BIKES: process.env.HOST_BIKES,
    HOST_FOOD: process.env.HOST_FOOD,
    HOST_TOYS: process.env.HOST_TOYS,
}

const APPLICATION_ROUTES = {
    BIKE_ROUTES:{
        DEFAULT: "/classA/bikes",
        ALL_BIKES: "/all/:location",
        BIKES_TEAM: "/team"
    },
}
module.exports = {ENV, APPLICATION_ROUTES};

