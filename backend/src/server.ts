import express, { Request, Response } from "express";
import multer from "multer";
import sharp from "sharp";
import cors from "cors";

const app = express();
const port = 3000;
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.post(
  "/uploads",
  upload.single("imgInput"),
  async (req: Request, res: Response) => {
    //// add image type check

    const newHeight = parseInt(req.body.height);
    const newWidth = parseInt(req.body.width);

    const newImg = await sharp(req.file?.buffer)
      .resize(newWidth, newHeight)
      .toFormat("jpg")
      .toBuffer();

    res.set("Content-Type", "image/jpg");
    res.send(newImg);
    // res.sendStatus(200);
    console.log("response is sent back!");
  }
);

app.get("/", async (req: Request, res: Response) => {
  res.send(
    "Hello, this is resizing images server. \n if you are trying to use it, you must send request on the path : 'http://localhost:3000/uploads'.\n Thanks for your time!",
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;