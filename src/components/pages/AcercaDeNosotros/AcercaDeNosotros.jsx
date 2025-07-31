import { Container, Row, Col, Image } from "react-bootstrap";
import mi_imagen from '../../../assets/mi_imagen.jpg';

import './AcercaDeNosotros.css';
const AcercaDeNosotros = () => {
    return (  <>
    <section className="mainSection d-flex justify-content-center align-items-center">
      <Container >
        <Row
          className="mi-row align-items-center justify-content-center rounded p-5"
        >
          <Col xs={12} md={5} className=" d-flex justify-content-center mb-4 mb-md-0">
            <Image
              src={mi_imagen}
              alt="Juan Ruiz"
              rounded
             className="mi-imagen"
            />
          </Col>
          <Col xs={12} md={7}>
            <h2 className="text-white mi-name"
            >
              JUAN<br />RUIZ
            </h2>
            <p className="mi-p">
              Hola, mi nombre es Juan Ruiz, tengo 21 años y soy estudiante de la Licenciatura en Informática.
              Me apasiona el aprendizaje constante y disfruto enfrentando desafíos que me permitan proponer soluciones prácticas e innovadoras.
              Me motiva encontrar maneras eficientes de resolver problemas, y siempre busco mejorar mis habilidades tanto técnicas como personales en cada proyecto que emprendo.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
    </>);
}
 
export default AcercaDeNosotros;