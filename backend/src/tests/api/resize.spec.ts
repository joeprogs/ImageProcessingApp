import supertest from "supertest";
import app from "../../server";

describe("Resize API Endpoints", () => {
    const testImage = "test_upload2.jpg";

    const request = supertest(app);

    it("should resize images successfully (GET /api/resize)", async () => {
        const response = await request.get(
            `/api/resize?file=${testImage}&width=300&height=200`
        );
        expect(response.status).toBe(200);
    });
});
