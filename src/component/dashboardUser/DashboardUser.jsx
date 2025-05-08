import { Container, Row, Col, InputGroup, FormControl, Card, Image, Nav, Button } from "react-bootstrap";

import epic from "../../assets/img/epic.png";
import { useNavigate } from "react-router";
import NavbarUser from "./NavbarUser";
import { useSelector } from "react-redux";

export default function DashboardUser() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <Container fluid className="p-0" style={{ minHeight: "100vh", position: "relative" }}>
      <Card className="border-0 rounded-0">
        <Card.Body className="d-flex align-items-center justify-content-between" style={{ backgroundColor: "#f5f5f5" }}>
          <div className="d-flex align-items-center">
            <Image src={user?.avatar} roundedCircle width={48} height={48} className="me-2" />
            <div>
              <small className="text-muted">Welcome</small>
              <h5 className="mb-0">{user.nome + " " + user.cognome}</h5>
            </div>
          </div>
          <Image src={epic} height={40} />
        </Card.Body>
      </Card>
      <Card className="border-0 rounded-0" style={{ backgroundColor: "#f5f5f5" }}>
        <Card.Body className="d-flex align-items-center justify-content-between" style={{ backgroundColor: "#f5f5f5" }}>
          <h5 className="mb-0">Gestione fatture</h5>
          <Button
            variant="outline-secondary"
            className="d-none d-lg-block"
            onClick={() => navigate("/dashboardFatture")}
          >
            {" "}
            Vai alle fatture{" "}
          </Button>
        </Card.Body>
        
      </Card>
      <Card className="border-0 rounded-0" style={{ backgroundColor: "#f5f5f5" }}>
        <Card.Body className="d-flex align-items-center justify-content-between" style={{ backgroundColor: "#f5f5f5" }}>
          <h5 className="mb-0">Gestione Clienti</h5>
          <Button
            variant="outline-secondary"
            className="d-none d-lg-block"
            onClick={() => navigate("/dashboardClienti")}
          >
            {" "}
            Vai ai Clienti{" "}
          </Button>
        </Card.Body>
      </Card>
      <NavbarUser />
    </Container>
  );
}
