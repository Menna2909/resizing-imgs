import express, { Request, Response } from "express";
import multer from "multer";
import cors from "cors";
import { process } from "./routes/imgProcc";
import { pathResizer } from "./routes/prccPath";

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
  async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).send("No data are sent to the server");
      return;
    }

    const newHeight = parseInt(req.body.height);
    const newWidth = parseInt(req.body.width);
    const bufferImg = req.file.buffer;

    const newImg = await process(bufferImg, newWidth, newHeight);

    res.set("Content-Type", "image/jpg");
    res.send(newImg);
    // res.sendStatus(200);
    console.log("response is sent back!");
  },
);

app.post("/resize", async (req: Request, res: Response): Promise<void> => {
  const { imgInput, width, height } = req.body;

  const response = await pathResizer(imgInput, width, height);
  res.set("Content-Type", "image/jpg");
  res.send(response);
});

app.get("/", async (req: Request, res: Response) => {
  res.send(
    "Hello, this is resizing images server. \n if you are trying to use it, you must send request on the path : 'http://localhost:3000/uploads'.\n Thanks for your time!",
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;
