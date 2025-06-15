import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const imagesRoute = express.Router();

function generateImageName(originalName: string): string {
    return (
        path.parse(originalName).name +
        "-" +
        Date.now() +
        path.extname(originalName)
    );
}

// Multer configuration for image uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: "images/",
        filename: (req, file, cb) => {
            cb(null, generateImageName(file.originalname));
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg/;
        const isValidExt = allowedTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        const isValidMime = allowedTypes.test(file.mimetype);
        cb(null, isValidExt && isValidMime); // Accept if both checks pass
    },
});

imagesRoute.post("/", upload.single("image"), (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "Invalid file." });
    } else {
        res.status(200).json({
            image: generateImageName(req.file.originalname),
        });
    }
});

imagesRoute.get("/", (req, res) => {
    const imagesDir = path.join(__dirname, "../../../images");
    try {
        const files = fs.readdirSync(imagesDir);
        const images = files.filter((file) => /\.(jpg|jpeg)$/i.test(file));
        res.json(images);
    } catch (err) {
        res.status(500).send(`Server Error: ${err}`);
    }
});

export default imagesRoute;
