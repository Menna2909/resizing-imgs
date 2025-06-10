const path = require('path');
const fs = require('fs');
const request = require('supertest');
const app = require('../server'); // Adjust path as needed

describe("POST /uploads", () => {
  it("should return a response with content-type header: 'image/jpg'", async () => {
    // Get first image from your images directory
    const imagesDir = path.join(__dirname, '..', '..', 'src', 'images');
    const imageFiles = fs.readdirSync(imagesDir).filter(file => 
      ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())
    );
    
    if (imageFiles.length === 0) {
      throw new Error('No test images found in src/images directory');
    }

    const imagePath = path.join(imagesDir, imageFiles[0]);

    const response = await request(app)
      .post("/uploads")
      .field("width", '500')
      .field("height", '500')
      .attach("imgInput", imagePath);

    // Basic response validation
    expect(response.headers['content-type']).toBe('image/jpg'); // Standard MIME type
    expect(response.body).toBeInstanceOf(Buffer); 
  });
});