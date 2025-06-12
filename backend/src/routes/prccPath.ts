import sharp from "sharp";
import path from "path";

//takes a path in and return a path out
export const pathResizer = async (
  imgPath: string,
  newWidth: number,
  newHeight: number,
): Promise<Buffer> => {
  const imgPathNew = path.resolve(imgPath);
  const resized = await sharp(imgPathNew)
    .resize(newWidth, newHeight)
    .toFormat("jpg")
    .toBuffer();
  return resized;
};
