"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const imgProcc_1 = require("../routes/imgProcc");
const testImagePath = (0, path_1.join)(
  __dirname,
  "..",
  "..",
  "images",
  "fjord.jpg",
);
describe("POST /uploads (image processing part)", () => {
  it("shall return a resized image in the form of buffer", async () => {
    try {
      const imgBuffer = (0, fs_1.readFileSync)(testImagePath);
      const response = await (0, imgProcc_1.process)(imgBuffer, 500, 500);
      expect(response).toBeInstanceOf(Buffer);
      expect(response.length).toBeGreaterThan(0);
    } catch (error) {
      console.log(
        `An error occured while testing the image processing : ${error}`,
      );
    }
  });
});
