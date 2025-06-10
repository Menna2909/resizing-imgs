import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const testImagePath = path.join(__dirname, "..", "images", "fjord.jpg");

describe("POST /uploads (image processing part)", () => {
  // Remove async here
  it("shall return a resized image", async () => {
    const form = new FormData();
    form.append("imgInput", fs.createReadStream(testImagePath));
    form.append("width", "500");
    form.append("height", "500");

    const response = await fetch("http://localhost:3000/uploads", {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toMatch(/^image\/jpg/);

    const arrayBuffer = await response.arrayBuffer();
    expect(arrayBuffer).toBeInstanceOf(ArrayBuffer);

    const buffer = Buffer.from(arrayBuffer);
    expect(buffer).toBeInstanceOf(Buffer);
  });
});
