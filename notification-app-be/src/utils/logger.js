import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const log = async (stack, level, packageName, message) => {

    try {

        await axios.post(
            `${process.env.BASE_URL}/logs`,
            {
                stack,
                level,
                package: packageName,
                message
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (err) {

        console.error(err.message);

    }

};

export default log;