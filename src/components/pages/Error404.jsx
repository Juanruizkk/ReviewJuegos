
import { Link } from "react-router";

const Error404 = () => {
    return ( 
        <>
         <div className="mainSection position-relative">
      <div
        className="banner-error d-flex flex-column justify-content-center align-items-center text-light"
      >
        <h1 className="text-center display-1 fw-bold">404</h1>
        <h2 className="text-center mb-4">Perdón, no encontramos la página que estás buscando</h2>
        <Link className="btn btn-success mt-2" to="/">
          Volver al inicio
        </Link>
      </div>
    </div>
        </>
     );
}
 
export default Error404;