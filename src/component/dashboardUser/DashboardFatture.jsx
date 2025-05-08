// src/component/dashboard/DashboardFattureUtente.jsx
import React, { useState } from "react";
import { Container, Row, Col, InputGroup, FormControl, Button, Card, Image, Form } from "react-bootstrap";
import { Search, ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router";

import epic from "../../assets/img/epic.png";
import avatar from "../../assets/img/avatar.png";
import successIcon from "../../assets/img/success.png";
import iconWarning from "../../assets/img/iconWarning.png";
import iconDanger from "../../assets/img/iconDanger.png";
import FilterButton from "../filtroFatture/FilterButton";
import NavbarUser from "./NavbarUser";

const mockFatture = [
  { id: 1, data: "05-06-2025", importo: "1200€", stato: "Pagata", color: "#8CC152", icon: successIcon },
  { id: 2, data: "05-06-2025", importo: "200€", stato: "Da Pagare", color: "#D9534F", icon: iconDanger },
  { id: 3, data: "05-06-2025", importo: "500€", stato: "In Attesa", color: "#FFB400", icon: iconWarning },
  { id: 4, data: "05-06-2025", importo: "800€", stato: "Da Pagare", color: "#D9534F", icon: iconDanger },
  { id: 5, data: "05-06-2025", importo: "950€", stato: "Pagata", color: "#8CC152", icon: successIcon },
  { id: 6, data: "05-06-2025", importo: "300€", stato: "In Attesa", color: "#FFB400", icon: iconWarning },
];

function DashboardFatture() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Tutte");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiUrl}/clienti?nomeParziale=${search}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setResult(data);
        } else {
          console.error("Error fetching data:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const filtered = mockFatture.filter((filterColor) => {
    const matchesFilter = activeFilter === "Tutte" || filterColor.stato === activeFilter;
    const matchesSearch = filterColor.id.toString().includes(search);
    return matchesFilter && (!search || matchesSearch);
  });

  return (
    <>
      <Container fluid className="p-0 position-relative" style={{ height: "100vh" }}>
        <Card className="border-0 rounded-0">
          <Card.Body
            className="d-flex align-items-center justify-content-between"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <div className="d-flex align-items-center">
              <Image src={avatar} roundedCircle width={48} height={48} className="me-2" />
              <div>
                <small className="text-muted">Le Tue Fatture</small>
                <h5 className="mb-0">Davide</h5>
              </div>
            </div>
            <Image src={epic} height={40} />
          </Card.Body>
        </Card>

        <Container className="py-3">
          <div className="d-flex mb-2">
            <Button
              variant="link"
              onClick={() => navigate(-1)}
              className="p-2 me-2  "
              style={{ color: "#B92858", border: "2px solid #B92858" }}
            >
              <ArrowLeft size={24} />
            </Button>
            <Form onSubmit={(e) => handleSubmit(e)} className="w-100">
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
            </Form>
          </div>

          <FilterButton activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

          <Row className="g-3">
            {filtered.map((mockFattureMap) => (
              <Col key={mockFattureMap.id} xs={6} md={6} lg={12}>
                <Card
                  style={{
                    backgroundColor: mockFattureMap.color,
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <Card.Body>
                    <Card.Title className="h5">Fattura N° {mockFattureMap.id}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small>Stato: {mockFattureMap.stato}</small>
                      {mockFattureMap.icon && <Image src={mockFattureMap.icon} width={24} />}
                    </div>
                    <hr style={{ borderColor: "rgba(255,255,255,0.5)" }} />
                    <Card.Text>Data: {mockFattureMap.data}</Card.Text>
                    <Card.Text>Importo: {mockFattureMap.importo}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
        <NavbarUser />
      </Container>
    </>
  );
}

export default DashboardFatture;
