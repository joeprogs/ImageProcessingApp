import fs from "fs";
import sharp from "sharp";
import path from "path";
import { resizeImage } from "../resizing";

describe("Image Resizing Logic", () => {
    const testImagePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "images",
        "test_upload.jpg"
    );
    const outputPath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "images",
        "resized_test_upload.jpg"
    );

    it("should resize an image to specified dimensions", async () => {
        await resizeImage(testImagePath, outputPath, 300, 200);

        expect(fs.existsSync(outputPath)).toBeTrue();

        const metadata = await sharp(outputPath).metadata();
        expect(metadata.width).toBe(300);
        expect(metadata.height).toBe(200);

        fs.unlinkSync(outputPath);
    });
});
