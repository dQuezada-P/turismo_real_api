import { uploadFile, getUrl } from "../utils/s3.js";

export const UploadImagen = async (req, res, next) => {
  console.log(req.files)
  try {
    const images = Object.values(req.files); //const keys = Object.keys(req.files);
    console.log(images)
    async function SubirImagen() {
      images.forEach(async (image) => {
        await uploadFile(image);
      });
    }
    await SubirImagen();
    next();
  } catch (error) {
    console.log(error);
  }
};

export const GetImage = async (req, res) => {
  const images = Object.values(req.files);
  const nameImages = images.map((image) => image.name);
  const urlsImages = [];
  try {
    async function ObtenerUrl() {
      // let promises = nameImages.map((name) => {
      //   return getUrl(name).then((e) => {
      //     g.push(e);
      //   });
      // });
      // await Promise.all(promises);

      await Promise.all(
        nameImages.map((name) => {
          //recorre el arreglo de los
          return getUrl(name).then((url) => {
            // nombres de las imagenes, los extrae
            urlsImages.push(url); // y los agrega al array urlsImages
          });
        })
      );
    }
    await ObtenerUrl();
    res.json(urlsImages);
  } catch (error) {
    console.log(error)
  }
};
