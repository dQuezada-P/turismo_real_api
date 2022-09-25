import { uploadFile, getUrl } from "../utils/s3.js";

export const UploadImagen = (req, res, next) => {
  //const keys = Object.keys(req.files);

  const images = Object.values(req.files);

  async function SubirImagen() {
    images.forEach(async (image) => {
      await uploadFile(image);
    });
  }
  SubirImagen();
  next();
};

export const GetImage = (req, res) => {

  const images = Object.values(req.files);
  const nameImages = images.map((image) => image.name);

  async function ObtenerUrl() {
    const promises = nameImages.map(async (name) => {
      return getUrl(name);
    });
    await Promise.all(promises);
    console.log(promises)
  }
  ObtenerUrl();
  res.send('aaaaaaaaaaaaaaaaaaaaaaaaaa')
};
