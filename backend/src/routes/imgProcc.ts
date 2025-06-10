import sharp from "sharp";

/**
 * @param buffer
 * @param width
 * @param height
 * @returns Promise<Buffer>
 */
export const process = async (
  buffer: Buffer,
  width: number,
  height: number,
): Promise<Buffer> => {
  try {
    const resizedImage = await sharp(buffer)
      .resize(width, height)
      .toFormat("jpg")
      .toBuffer();
    return resizedImage;
  } catch (error) {
    console.error("Image processing error:", error);
    throw error;
  }
};
