import { uploadFile, getUrl, deleteFile } from "../utils/s3.js";

// export const UploadImagen = async (req, res, next) => {
export const UploadImagen = async (files, id, route, last_files_count = false) => {
  // console.log(req.files)
  try {
    const images = !last_files_count 
      ? genImagesNames(Object.values(files), id) 
      : genUpdatedImagesNames(Object.values(files), id, last_files_count);
    async function SubirImagen() {
      images.forEach(async (image) => {
        await uploadFile(image, route);
      });
    }
    await SubirImagen();
    return await GetImage(files, route);
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

const genUpdatedImagesNames = (images, department_id, last_files_count) => {
  return images.map((image) => {
    last_files_count += 1
    image.name = department_id + '_' + last_files_count.toString() + '.' + image.name.split('.')[1];
    return image
  })
}

export const GetImage = async (files, route) => {
  const images = Object.values(files);
  const nameImages = images.map((image) => image.name);
  const urlsImages = [];
  try {
    async function ObtenerUrl() {
      await Promise.all(
        nameImages.map((name) => {
          //recorre el arreglo de los
          return getUrl(name, route).then(() => {
            // nombres de las imagenes, los extrae
            urlsImages.push("https://turismoreal2.s3.amazonaws.com/"+ route + name); // y los agrega al array urlsImages
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

export const DeleteFile = async (files, route) => {
  try {
    files.map(async (file) => {
      const result = await deleteFile(file, route);
      return result;
    });
  } catch (error) {
    console.error(error);
  }
};
