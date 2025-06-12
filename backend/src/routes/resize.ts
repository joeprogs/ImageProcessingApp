import express from "express";
import path from "path";
import { resizeImage } from "../resizing";

const resizeRoute = express.Router();

type ResizeQuery = {
    file: string;
    width: string;
    height: string;
};

resizeRoute.get("/", (req, res) => {
    const { file, width, height } = req.query as ResizeQuery;
    if (!file || !width || !height) {
        res.status(400).json({
            error: "Error: Missing file, width, or height.",
        });
    } else {
        try {
            resizeImage(
                path.join(__dirname, "..", "..", "..", "images", file),
                path.join(
                    __dirname,
                    "..",
                    "..",
                    "..",
                    "images",
                    `${width}x${height}-${file}`
                ),
                parseFloat(width),
                parseFloat(height)
            ).then(() => {
                res.status(200).json({ image: `${width}x${height}-${file}` });
            });
        } catch (err) {
            res.status(400).json({ error: `Error: ${err}` });
        }
    }
});

export default resizeRoute;
