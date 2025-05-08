import { Card } from "react-bootstrap";
import { Link } from "react-router";

const CardClienti = ({ cliente }) => {
    return (
        <Card>
          <Card.Img variant="top" src={cliente.logoAziendale} />
          <Card.Body>
            <Card.Title>{cliente.ragioneSociale}</Card.Title>
            <Link to={"/paginaProfilo/" + cliente.id} state={cliente} as={Link} className="btn btn-primary">
                        Vai al dettaglio cliente
                    </Link>
          </Card.Body>
        </Card>
        );
}
export default CardClienti;