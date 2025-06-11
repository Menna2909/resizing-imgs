import { join } from "path";
import { readFileSync } from "fs";
import { process } from "../routes/imgProcc";

const testImagePath = join(__dirname, "..", "..", "images", "fjord.jpg");

describe("POST /uploads (image processing part)", () => {
  it("shall return a resized image in the form of buffer", async () => {
    try {
      const imgBuffer = readFileSync(testImagePath);
      const response = await process(imgBuffer, 500, 500);

      expect(response).toBeInstanceOf(Buffer);
      expect(response.length).toBeGreaterThan(0);
    } catch (error) {
      console.log(
        `An error occured while testing the image processing : ${error}`,
      );
    }
  });
});
