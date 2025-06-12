"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathResizer = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
//takes a path in and return a path out
const pathResizer = async (imgPath, newWidth, newHeight) => {
    const imgPathNew = path_1.default.resolve(imgPath);
    const resized = await (0, sharp_1.default)(imgPathNew)
        .resize(newWidth, newHeight)
        .toFormat("jpg")
        .toBuffer();
    return resized;
};
exports.pathResizer = pathResizer;
