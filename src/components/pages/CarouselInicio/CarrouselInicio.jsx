import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { listarimagenesAPI } from "../../Helpers/CarouselQueries";

const CarrouselInicio = () => {
  const [imagenesCarousel, setImagenesCarousel] = useState([]);

  useEffect(() => {
    const fetchImagenes = async () => {
      const response = await listarimagenesAPI();
      if (response.status === 200) {
        const imagenes = await response.json();
        setImagenesCarousel(imagenes.filter(img => img.seleccionada));
      }
    };
    fetchImagenes();
  }, []);

  if (imagenesCarousel.length === 0) {
    return null;
  }

  return (
    <Carousel>
      {imagenesCarousel.map((img, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={img.url}
            alt={`carousel-${idx}`}
            style={{ objectFit: "cover", height: "600px" }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarrouselInicio;