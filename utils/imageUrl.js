export const formatImagenUrl = (stringsImages) => {
  const strings = stringsImages.split(",");
  const imagenes = strings.map((string) => {
    let [url, name] = string.split(";");
    let object = {
      name: name,
      url: url,
    };
    return object;
  });
  return imagenes
};
