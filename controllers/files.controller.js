import { uploadFile, getUrl, deleteFile } from "../utils/s3.js";

// export const UploadImagen = async (req, res, next) => {
export const UploadImagen = async (files, department_id) => {
  // console.log(req.files)
  try {
    const images = genImagesNames(Object.values(files), department_id); //const keys = Object.keys(req.files);
    async function SubirImagen() {
      images.forEach(async (image) => {
        console.log(image)
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

const genImagesNames = (images, department_id) => {
  let i = 1
  return images.map((image) => {
    image.name = department_id + '_' + i.toString() + '.' + image.name.split('.')[1];
    i += 1
    return image
  })
}

export const GetImage = async (files) => {
  const images = Object.values(files);
  const nameImages = images.map((image) => image.name);
  const urlsImages = [];
  try {
    async function ObtenerUrl() {
      await Promise.all(
        nameImages.map((name) => {
          //recorre el arreglo de los
          return getUrl(name).then(() => {
            // nombres de las imagenes, los extrae
            urlsImages.push("https://turismoreal2.s3.amazonaws.com/" + name); // y los agrega al array urlsImages
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