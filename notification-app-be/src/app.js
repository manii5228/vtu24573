import express from "express";
import cors from "cors";
import helmet from "helmet";

import loggerMiddleware from "../../logging-middleware/src/middleware/logger.middleware.js";
import errorMiddleware from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use(loggerMiddleware);


app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "Notification Backend Running"
    });

});

app.use(errorMiddleware);

export default app;