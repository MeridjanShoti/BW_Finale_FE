// src/component/dashboard/DashboardFattureUtente.jsx
import React, { useEffect, useState } from "react";
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

function DashboardFatture() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Tutte");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchTutteFatture = () => {
    fetch(`${apiUrl}/fatture`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data) {
          setResult(data.content);
        } else {
          console.error("Error fetching data:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchTutteFatture();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const filtered = result.filter((filterColor) => {
    const statoNome = filterColor.stato.nome.toLowerCase();
    const filtroNome = activeFilter.toLowerCase();

    const matchesFilter = filtroNome === "tutte" || statoNome === filtroNome;
    const matchesSearch = filterColor.numero?.toString().includes(search);
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
          <div className="d-flex justify-content-center align-items-center">
            <div className="w-100">
              <h1 className="my-4 text-center">Fatture clienti</h1>
              <div className="d-flex gap-3 align-items-center">
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
            </div>
          </div>

          <FilterButton activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

          <Row className="g-3">
            {filtered.map((fattura) => (
              <Col key={fattura.id} xs={6} md={6} lg={12}>
                <Card
                  style={{
                    backgroundColor: {
                      PAGATA: "#8cc152",
                      "NON PAGATA": "#d9534f",
                      "IN ATTESA": "#ffb400",
                    }[fattura.stato.nome],
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  <Card.Body>
                    <Card.Title className="h5">Fattura N° {fattura.numero}</Card.Title>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small>
                        Stato: {fattura.stato.nome.charAt(0).toUpperCase() + fattura.stato.nome.slice(1).toLowerCase()}
                      </small>
                      {fattura.stato.nome === "PAGATA" && <Image src={successIcon} width={24} />}
                      {fattura.stato.nome === "IN ATTESA" && <Image src={iconWarning} width={24} />}
                      {fattura.stato.nome === "NON PAGATA" && <Image src={iconDanger} width={24} />}
                    </div>
                    <hr style={{ borderColor: "rgba(255,255,255,0.5)" }} />
                    <Card.Text>Data: {new Date(fattura.data).toLocaleDateString("it-IT")}</Card.Text>
                    <Card.Text>
                      Importo: {fattura.importo.toLocaleString("it-IT", { style: "currency", currency: "EUR" })}
                    </Card.Text>
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
