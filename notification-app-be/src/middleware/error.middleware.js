import log from "../utils/logger.js";

const errorMiddleware = async (err, req, res, next) => {

    const statusCode = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    await log(
        "backend",
        "error",
        "middleware",
        `${statusCode} - ${message} - ${req.method} ${req.originalUrl}`
    );

    res.status(statusCode).json({

        success: false,

        message: message,

        ...(process.env.NODE_ENV === "development" && { stack: err.stack })

    });

};

export default errorMiddleware;