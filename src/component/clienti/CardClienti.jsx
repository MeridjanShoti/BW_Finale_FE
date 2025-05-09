import { Card } from "react-bootstrap";
import { Link } from "react-router";

const CardClienti = ({ cliente }) => {
  return (
    <Card className="shadow-sm border-0 rounded-4 h-100">
      <Card.Img
        variant="top"
        src={cliente.logoAziendale}
        alt={`Logo ${cliente.ragioneSociale}`}
        style={{ objectFit: "cover", height: "180px", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
      />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="fw-bold text-primary mb-2">{cliente.ragioneSociale}</Card.Title>
          <Card.Text className="text-muted mb-1">
            <strong>Email:</strong> {cliente.email}
          </Card.Text>
          <Card.Text className="text-muted mb-1">
            <strong>Telefono:</strong> {cliente.telefono || "N/D"}
          </Card.Text>
          <Card.Text className="text-muted mb-2">
            <strong>Tipo:</strong> {cliente.tipoCliente}
          </Card.Text>
        </div>
        <Link to={"/paginaProfilo/" + cliente.id} state={cliente} className="btn btn-outline-primary w-100 mt-3">
          Vai al dettaglio
        </Link>
      </Card.Body>
    </Card>
  );
};

export default CardClienti;
