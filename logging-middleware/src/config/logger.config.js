import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const loggerAPI=axios.create({
    baseURL:process.env.LOG_BASE_URl,
    header:{
        AUthorization:`Bearer ${process.env.ACCESS_TOKEN}`,
        "Content-Type":"application/json",

    },
    timeout:5000,

});

export default  loggerAPI;