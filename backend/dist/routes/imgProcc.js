"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.process = void 0;
const sharp_1 = __importDefault(require("sharp"));
/**
 * @param buffer
 * @param width
 * @param height
 * @returns Promise<Buffer>
 */
const process = async (buffer, width, height) => {
  try {
    const resizedImage = await (0, sharp_1.default)(buffer)
      .resize(width, height)
      .toFormat("jpg")
      .toBuffer();
    return resizedImage;
  } catch (error) {
    console.error("Image processing error:", error);
    throw error;
  }
};
exports.process = process;
