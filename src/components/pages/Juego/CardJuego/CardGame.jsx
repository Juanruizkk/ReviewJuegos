import "./CardGame.css";
import { Col } from "react-bootstrap";
import { Link } from "react-router";
const CardGame = ({juego}) => {
  return (
    <Col md={4} lg={3}  className="mb-3 wrapper d-flex justify-content-center">
    <div className="game-card">
        <div className="game-card-image">
            <img src={juego.imagen} alt={juego.nombreJuego}/>
        </div>
        <div className="game-card-content">
            <h3 className="game-card-title">{juego.nombreJuego}</h3>
            <div className="game-card-price">{juego.precio} ARS</div>
            <Link className="game-card-button" to={'/detalle-juego/'+ juego.id}>Ver más</Link>
        </div>
    </div>
    </Col>
    
  );
};

export default CardGame;
