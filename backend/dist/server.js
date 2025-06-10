"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const sharp_1 = __importDefault(require("sharp"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/uploads", upload.single("imgInput"), async (req, res) => {
    //// add image type check
    const newHeight = parseInt(req.body.height);
    const newWidth = parseInt(req.body.width);
    const newImg = await (0, sharp_1.default)(req.file?.buffer)
        .resize(newWidth, newHeight)
        .toFormat("jpg")
        .toBuffer();
    res.set("Content-Type", "image/jpg");
    res.send(newImg);
    // res.sendStatus(200);
    console.log("response is sent back!");
});
app.get("/", async (req, res) => {
    res.send("Hello, this is resizing images server. \n if you are trying to use it, you must send request on the path : 'http://localhost:3000/uploads'.\n Thanks for your time!");
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
exports.default = app;
