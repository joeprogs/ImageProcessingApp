import supertest from "supertest";
import app from "../../server";
import path from "path";

describe("Image API Endpoints", () => {
    const testImagePath = path.join(
        __dirname,
        "..",
        "..",
        "..",
        "..",
        "images",
        "test_upload.jpg"
    );

    const request = supertest(app);

    it("should get images successfully (GET /api/images)", async () => {
        const response = await request.get("/api/images");
        expect(response.status).toBe(200);
    });

    it("should upload an image successfully (POST /api/images)", async () => {
        const response = await request
            .post("/api/images")
            .attach("image", testImagePath);
        expect(response.status).toBe(200);
    });
});
