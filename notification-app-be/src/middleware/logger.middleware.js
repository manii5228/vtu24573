import log from "../utils/logger.js";

const loggerMiddleware = async (req, res, next) => {

    const start = Date.now();

    await log(
        "backend",
        "info",
        "middleware",
        `${req.method} ${req.originalUrl} Request`
    );

    res.on("finish", async () => {

        await log(
            "backend",
            "info",
            "middleware",
            `${req.method} ${req.originalUrl} ${res.statusCode} ${Date.now() - start}ms`
        );

    });

    next();

};

export default loggerMiddleware;