import { Container, Row, Col, Button } from "react-bootstrap";
import { LightningChargeFill, Globe2, PeopleFill } from "react-bootstrap-icons";

const HomeDescription = () => {
  return (
    <div className="hero-section text-light d-flex align-items-center">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="icon-wrapper mb-4">
              <LightningChargeFill size={64} className="pulse-icon text-warning" />
            </div>
            <h1 className="display-4 fw-bold mb-3">Energia che ispira. Soluzioni che trasformano.</h1>
            <p className="lead mb-4">
              In <strong>Epic Energy</strong> crediamo in un futuro sostenibile e intelligente. Offriamo soluzioni
              energetiche all'avanguardia per privati, aziende e pubblica amministrazione.
            </p>
            <Row className="justify-content-center mb-4">
              <Col md={4} className="mb-3">
                <div className="feature-card">
                  <Globe2 size={32} className="text-info mb-2" />
                  <h5>Sostenibilità</h5>
                  <p className="small">Promuoviamo l'energia pulita e la transizione ecologica.</p>
                </div>
              </Col>
              <Col md={4} className="mb-3">
                <div className="feature-card">
                  <LightningChargeFill size={32} className="text-warning mb-2" />
                  <h5>Efficienza</h5>
                  <p className="small">Tecnologie smart per un consumo consapevole e ottimizzato.</p>
                </div>
              </Col>
              <Col md={4} className="mb-3">
                <div className="feature-card">
                  <PeopleFill size={32} className="text-success mb-2" />
                  <h5>Supporto</h5>
                  <p className="small">Assistenza continua e consulenza energetica su misura.</p>
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-center gap-3">
              <Button variant="warning" size="lg">
                Scopri i nostri servizi
              </Button>
              <Button variant="outline-light" size="lg">
                Contattaci
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeDescription;
