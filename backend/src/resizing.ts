import sharp from "sharp";

export const resizeImage = async (
    inputPath: string,
    outputPath: string,
    width: number,
    height: number
) => {
    await sharp(inputPath).resize(width, height).toFile(outputPath);
};