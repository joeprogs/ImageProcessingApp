import express from "express";

import resizeRoute from "./resize";
import imagesRoute from "./images";

const routes = express.Router();

routes.use("/resize", resizeRoute);
routes.use("/images", imagesRoute);

routes.get("/", (req, res) => {
    res.send("API home route.");
});

export default routes;
