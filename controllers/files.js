import { uploadFile, getUrl, deleteFile } from "../utils/s3.js";

// export const UploadImagen = async (req, res, next) => {
export const UploadImagen = async (files, next) => {
  // console.log(req.files)
  try {
    const images = Object.values(files); //const keys = Object.keys(req.files);
    async function SubirImagen() {
      images.forEach(async (image) => {
        await uploadFile(image);
      });
    }
    await SubirImagen();
    return await GetImage(files);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const GetImage = async (files) => {
  const images = Object.values(files);
  const nameImages = images.map((image) => image.name);
  const urlsImages = [];
  try {
    async function ObtenerUrl() {
      await Promise.all(
        nameImages.map((name) => {
          //recorre el arreglo de los
          return getUrl(name).then((url) => {
            // nombres de las imagenes, los extrae
            urlsImages.push(url + " ; " + name); // y los agrega al array urlsImages
          });
        })
      );
    }
    await ObtenerUrl();
    return urlsImages;
    // res.json(urlsImages);
  } catch (error) {
    console.log(error);
  }
};

export const DeleteFile = async (files) => {
  try {
    files.map(async (file) => {
      const result = await deleteFile(file);
      return result;
    });
  } catch (error) {
    console.error(error);
  }
};
