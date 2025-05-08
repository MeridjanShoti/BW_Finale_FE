import { Card, Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import successIcon from "../../assets/img/success.png";
import iconWarning from "../../assets/img/iconWarning.png";
import iconDanger from "../../assets/img/iconDanger.png";
import { useState } from "react";
import { useNavigate } from "react-router";

function Fatture() {
  const stats = [
    {
      title: "Fatture",
      count: 12,
      bg: "#B92858",
      icon: null,
    },
    {
      title: "Pagate",
      count: 3,
      bg: "#8BC94D",
      icon: successIcon,
    },
    {
      title: "In Attesa",
      count: 5,
      bg: "#FFB400",
      icon: iconWarning,
    },
    {
      title: "Da Pagare",
      count: 4,
      bg: "#EE404C",
      icon: iconDanger,
    },
  ];
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  return (
    <div className="fatture-container">
      <Container className="py-3">
        <InputGroup>
          <InputGroup.Text className="bg-white border-2" style={{ border: "2px solid #B92858" }}>
            <Search color="#B92858" />
          </InputGroup.Text>
          <FormControl
            placeholder="Cerca Fatture"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-2"
            style={{ border: "2px solid #B92858" }}
          />
        </InputGroup>
      </Container>

      <Container>
        <Row className="g-3">
          {stats.map((statsArray, i) => (
            <Col key={i} xs={12} md={6} lg={12}>
              <Card
                style={{ backgroundColor: statsArray.bg, color: "#fff", border: "none", cursor: "pointer" }}
                onClick={() => navigate("/dashboardFatture")}
              >
                <Card.Body className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title className="h5">{statsArray.title}</Card.Title>
                    <Card.Text className="h6">TOTALE FATTURE: {statsArray.count}</Card.Text>
                  </div>
                  {statsArray.icon && (
                    <img src={statsArray.icon} alt={statsArray.title} style={{ width: 32, height: 32 }} />
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Fatture;
