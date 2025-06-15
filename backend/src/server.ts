import express from "express";
import path from "path";

import routes from "./routes/index";

const app = express();
const port = 3000;

// Render the frontend
app.use(express.static(path.join(__dirname, "..", "..", "frontend")));
app.use("/images", express.static(path.join(__dirname, "..", "..", "images")));
app.use("/resized", express.static(path.join(__dirname, "..", "..", "cache")));

app.use("/api", routes);

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});

export default app;
