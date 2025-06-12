import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const imagesRoute = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
    destination: "images/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, path.parse(file.originalname).name + "-" + Date.now() + ext);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const isValid = allowedTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        cb(null, isValid);
    },
});

imagesRoute.post("/", upload.single("image"), (req, res) => {
    res.status(200).json({ message: "Uploaded" });
});

imagesRoute.get("/", (req, res) => {
    const imagesDir = path.join(__dirname, "../../../images");
    try {
        const files = fs.readdirSync(imagesDir);
        const images = files.filter((file) =>
            /\.(jpg|jpeg|png|gif)$/i.test(file)
        );
        res.json(images);
    } catch (err) {
        res.status(500).send(`Server Error: ${err}`);
    }
});

export default imagesRoute;
