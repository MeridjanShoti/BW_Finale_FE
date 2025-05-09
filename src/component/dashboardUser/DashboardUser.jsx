import { Container, Row, Col, InputGroup, FormControl, Card, Image, Nav, Button } from "react-bootstrap";

import epic from "../../assets/img/epic.png";
import { Link, useNavigate } from "react-router";
import NavbarUser from "./NavbarUser";
import { useSelector } from "react-redux";
import { ArrowRight } from "react-bootstrap-icons";

export default function DashboardUser() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <Container fluid className="p-0" style={{ minHeight: "100vh", position: "relative", backgroundColor: "#f8f9fa" }}>
      {/* Header */}
      <Card className="border-0 rounded-0 shadow-sm mb-3">
        <Card.Body className="d-flex align-items-center justify-content-between bg-white px-4 py-3">
          <div className="d-flex align-items-center">
            <Image src={user?.avatar} roundedCircle width={50} height={50} className="me-3" />
            <div>
              <div className="text-muted small">Benvenuto</div>
              <h5 className="mb-0">
                {user?.nome} {user?.cognome}
              </h5>
            </div>
          </div>
          <Image src={epic} height={40} />
        </Card.Body>
      </Card>

      {/* Sezioni */}
      <Container className="mb-5">
        {/* Fatture */}
        <Card className="mb-3 shadow-sm border-0 text-decoration-none colorDiv" as={Link} to="/dashboardFatture">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center px-4 py-3">
            <div>
              <h5 className="mb-1">Gestione Fatture</h5>
              <p className="mb-2 small">Visualizza tutte le fatture associate al tuo account</p>
            </div>
            {/*             <Button variant="outline-primary" className="mt-2 mt-md-0" onClick={() => navigate("/dashboardFatture")}>
              Vai alle Fatture
            </Button> */}
            <p className="text-end mb-0">
              Vai alle Fatture
              <ArrowRight className="ms-2" />
            </p>
          </Card.Body>
        </Card>

        {/* Clienti */}
        <Card className="shadow-sm border-0 text-decoration-none colorDiv" as={Link} to="/dashboardClienti">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center px-4 py-3">
            <div>
              <h5 className="mb-1">Gestione Clienti</h5>
              <p className="mb-2 small">Accedi ai tuoi clienti registrati e alle loro informazioni</p>
            </div>
            {/*             <Button variant="outline-success" className="mt-2 mt-md-0" onClick={() => navigate("/dashboardClienti")}>
              Vai ai Clienti
            </Button> */}
            <p className="text-end mb-0 ">
              Vai ai Clienti
              <ArrowRight className="ms-2" />
            </p>
          </Card.Body>
        </Card>
      </Container>

      <NavbarUser />
    </Container>
  );
}
