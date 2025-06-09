let rawImg;

describe("POST /uploads", () => {
  it("should return a response contatining the image required resized into 2X of its original size", async () => {
    const formData = new FormData();
    formData.append("imgInput", rawImg);
    formData.append("height", rawImg.height * 2);
    formData.append("width", rawImg.width * 2);
    fetch("http://localhost:3000/uploads", {
      method: "POST",
      body: formData,
    }).then((response) => {
      expect(response).tobe();
    });
  });
});
