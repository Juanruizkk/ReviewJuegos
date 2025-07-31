export const uploadImageAPI = async (formData) => {
  const preset_name = "games-zone";
  const cloud_name = "dsetebo4k";
 
  formData.append("upload_preset", preset_name);
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    return response;
  } catch (error) {
    console.error("Error subiendo la imagen:", error);
  }
};

export const guardarImagenEnBD = async (url) => {
  try {
    const response = await fetch("http://localhost:3000/imagenesCarousel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify({ url, seleccionada:false })
    });
    return response;
  } catch (error) {
    console.error("Error guardando la imagen en la BD:", error);
  }
};

export const listarimagenesAPI = async()=>{
    try {
        const respuesta = await fetch('http://localhost:3000/imagenesCarousel')
        return respuesta;
    } catch (error) {
        console.error(error)
        return false
    }
}

export const actualizarSeleccionImagen = async (id, seleccionada) => {
  try {
    const response = await fetch(`http://localhost:3000/imagenesCarousel/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ seleccionada })
    });
    return response;
  } catch (error) {
    console.error("Error actualizando la selección:", error);
  }
};

export const eliminarbannerAPI = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/imagenesCarousel/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    return false;
  }
};
