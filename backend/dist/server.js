"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const cors_1 = __importDefault(require("cors"));
const imgProcc_1 = require("./routes/imgProcc");
const prccPath_1 = require("./routes/prccPath");
const app = (0, express_1.default)();
const port = 3000;
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/uploads", upload.single("imgInput"), async (req, res) => {
    if (!req.file) {
        res.status(400).send("No data are sent to the server");
        return;
    }
    const newHeight = parseInt(req.body.height);
    const newWidth = parseInt(req.body.width);
    const bufferImg = req.file.buffer;
    const newImg = await (0, imgProcc_1.process)(bufferImg, newWidth, newHeight);
    res.set("Content-Type", "image/jpg");
    res.send(newImg);
    // res.sendStatus(200);
    console.log("response is sent back!");
});
app.post("/resize", async (req, res) => {
    const { imgInput, width, height } = req.body;
    const response = await (0, prccPath_1.pathResizer)(imgInput, width, height);
    res.set("Content-Type", "image/jpg");
    res.send(response);
});
app.get("/", async (req, res) => {
    res.send("Hello, this is resizing images server. \n if you are trying to use it, you must send request on the path : 'http://localhost:3000/uploads'.\n Thanks for your time!");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
exports.default = app;
