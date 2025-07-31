import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  uploadImageAPI,
  guardarImagenEnBD,
  listarimagenesAPI,
  actualizarSeleccionImagen,
  eliminarbannerAPI,
} from "../../Helpers/CarouselQueries";
import { Row, Col, Button } from "react-bootstrap";
import { mostrarError, mostrarExito } from "../../Helpers/alerts";
const AdministrarCarrousel = () => {
  const [loading, setLoading] = useState(false);
  const [listaImagenes, setListaImagenes] = useState([]);

  const listarImagenes = async () => {
    try {
      const response = await listarimagenesAPI();
      if (response.status === 200) {
        const imagenes = await response.json();
        setListaImagenes(imagenes);
      } else {
        console.log("Error al listar las imágenes");
      }
    } catch (error) {
      console.error("Error al listar las imágenes:", error);
    }
  };

  useEffect(() => {
    listarImagenes();
  }, []);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const response = await uploadImageAPI(formData);
      if (response.status === 200) {
        console.log("Imagen subida correctamente");
        const fileData = await response.json();
        const responseBD = await guardarImagenEnBD(fileData.secure_url);
        if (responseBD.status === 201) {
          console.log("Imagen guardada en la base de datos correctamente");
          listarImagenes(); // Actualiza la lista después de guardar
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error al subir la imagen:", error);
    }
  };

  // Manejar selección de imágenes (máximo 3)
  const handleSeleccion = async (img) => {
    const seleccionadasCount = listaImagenes.filter(
      (i) => i.seleccionada
    ).length;
    // Si ya está seleccionada, la deselecciona
    if (img.seleccionada) {
      await actualizarSeleccionImagen(img.id, false);
    } else if (seleccionadasCount < 3) {
      // Si no está seleccionada y hay menos de 3, la selecciona
      await actualizarSeleccionImagen(img.id, true);
    }
    // Vuelve a cargar la lista para actualizar el estado
    listarImagenes();
  };

  const handleEliminarBanner = async (imagenId) => {
    const banner = listaImagenes.find((b) => b.id === imagenId);
    if (!banner) return;
    const response = await eliminarbannerAPI(imagenId);
    if (response.status === 200) {
      mostrarExito("banner eliminado con exito");
      listarImagenes();
    } else {
      mostrarError("error al eliminar el usarario");
    }
  };

  const renderMensaje = () => {
    if (listaImagenes.length === 0) {
      return (
        <p className="text-light text-center">No hay imágenes subidas aún</p>
      );
    } else if (listaImagenes.length === 1 || listaImagenes.length === 2) {
      return (
        <>
          <p className="text-light text-center">
            Aún puede subir una imagen más.
          </p>
          <p className="text-light text-center">
            Seleccione <b>3 elementos</b>. Para seleccionar una nueva imagen,
            primero debe deseleccionar una de las ya seleccionadas.
          </p>
        </>
      );
    } else {
      return (
        <>
          <h2 className="text-light mt-4 mb-2">Imágenes guardadas</h2>
          <p className="text-light text-center">
            Seleccione <b>3 elementos</b>. Para seleccionar una nueva imagen,
            primero debe deseleccionar una de las ya seleccionadas.
          </p>
        </>
      );
    }
  };

  return (
    <>
      <div className="mainSection container d-flex flex-column align-items-center justify-content-center">
        <h1 className="display-4 text-light">Administrar Carrousel</h1>
        <Form.Group controlId="formFile" className="mb-3 w-50">
          <Form.Label className="text-light">
            Subir imagen para el carousel Inicio
          </Form.Label>
          <Form.Control
            type="file"
            name="file"
            accept="image/png, image/jpeg"
            onChange={uploadImage}
            className="bg-dark text-light"
          />
        </Form.Group>
        {loading && <h2 className="text-light">Loading...</h2>}

        {renderMensaje()}

        <Row className="justify-content-center">
          {listaImagenes.map((img, idx) => (
            <Col
              md={6}
              sm={6}
              xs={12}
              key={idx}
              className="mb-3 d-flex flex-column align-items-center"
            >
              <img
                src={img.url}
                alt={`carousel-${idx}`}
                className="img-fluid rounded shadow"
                style={{ height: 120, objectFit: "cover" }}
              />
              <div className="d-flex justify-content-between align-items-center mt-3">
                <Form.Check
                  type="checkbox"
                  id={`carousel-check-${idx}`}
                  label="Seleccionar"
                  checked={img.seleccionada === true}
                  onChange={() => handleSeleccion(img)}
                  disabled={
                    !img.seleccionada &&
                    listaImagenes.filter((i) => i.seleccionada).length >= 3
                  }
                  className="mt-2 text-light"
                />
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleEliminarBanner(img.id)}
                >
                  Eliminar
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default AdministrarCarrousel;
