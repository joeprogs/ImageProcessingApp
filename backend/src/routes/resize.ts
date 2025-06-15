import express from "express";
import path from "path";
import { resizeImage } from "../resizing";
import fs from "fs";

const resizeRoute = express.Router();

type ResizeQuery = {
    file: string;
    width: string;
    height: string;
};

function resizedImageName(name: string, width: string, height: string): string {
    return `${width}x${height}-${name}`;
}

resizeRoute.get("/", (req, res) => {
    const { file, width, height } = req.query as ResizeQuery;
    if (!file || !width || !height) {
        res.status(400).json({
            error: "Error: Missing file, width, or height.",
        });
    } else {
        try {
            const resizePath = path.join(
                __dirname,
                "..",
                "..",
                "..",
                "cache",
                resizedImageName(file, width, height)
            );
            if (!fs.existsSync(resizePath)) {
                resizeImage(
                    path.join(__dirname, "..", "..", "..", "images", file),
                    resizePath,
                    parseFloat(width),
                    parseFloat(height)
                );
            }
            res.status(200).json({
                image: resizedImageName(file, width, height),
            });
        } catch (err) {
            res.status(400).json({ error: `Error: ${err}` });
        }
    }
});

export default resizeRoute;
