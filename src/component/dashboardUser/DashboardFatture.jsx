import React, { useEffect, useState } from "react";
import { Container, Row, Col, InputGroup, FormControl, Button, Card, Image, Form } from "react-bootstrap";
import { Search, ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router";

import epic from "../../assets/img/epic.png";
import successIcon from "../../assets/img/success.png";
import iconWarning from "../../assets/img/iconWarning.png";
import iconDanger from "../../assets/img/iconDanger.png";
import FilterButton from "../filtroFatture/FilterButton";
import NavbarUser from "./NavbarUser";
import { useSelector } from "react-redux";

function DashboardFatture() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Tutte");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const user = useSelector((state) => state.user.user);

  // Filtri avanzati
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minImporto, setMinImporto] = useState("");
  const [maxImporto, setMaxImporto] = useState("");
  const [anno, setAnno] = useState("");

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchTutteFatture = (pageNumber = 0) => {
    const queryParams = new URLSearchParams();

    queryParams.append("page", pageNumber);
    queryParams.append("size", 10);
    queryParams.append("sort", "numero");
    queryParams.append("sort", "asc");

    if (startDate) queryParams.append("data", startDate);
    if (anno) queryParams.append("anno", anno);
    if (minImporto) queryParams.append("importoDa", minImporto);
    if (maxImporto) queryParams.append("importoA", maxImporto);
    if (search) queryParams.append("search", search);
    if (activeFilter && activeFilter !== "Tutte") queryParams.append("stato", activeFilter);

    fetch(`${apiUrl}/fatture?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.content) {
          setResult(data.content);
          setTotalPages(data.totalPages);
          setPage(data.number);
        } else {
          console.error("Errore nei dati:", data);
        }
      })
      .catch((error) => {
        console.error("Errore fetch:", error);
      });
  };

  useEffect(() => {
    fetchTutteFatture();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTutteFatture(0);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchTutteFatture(newPage);
    }
  };

  const resetAdvancedFilters = () => {
    setStartDate("");
    setEndDate("");
    setMinImporto("");
    setMaxImporto("");
    setAnno("");
    setSearch("");
    setActiveFilter("Tutte");
    fetchTutteFatture(0);
  };

  return (
    <>
      <Container fluid className="p-0 position-relative" style={{ minHeight: "100vh" }}>
        <Card className="border-0 rounded-0">
          <Card.Body
            className="d-flex align-items-center justify-content-between"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <div className="d-flex align-items-center">
              <Image src={user?.avatar} roundedCircle width={48} height={48} className="me-2" />
              <div>
                <small className="text-muted">Fatture Clienti</small>
                <h5 className="mb-0">
                  {user?.nome} {user?.cognome}
                </h5>
              </div>
            </div>
            <Image src={epic} height={40} />
          </Card.Body>
        </Card>

        <Container className="py-3">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <div className="w-100">
              <h1 className="mb-4 text-center">Fatture clienti</h1>
              <div className="d-flex gap-3 align-items-center">
                <Button
                  variant="link"
                  onClick={() => navigate(-1)}
                  className="p-2 me-2"
                  style={{ color: "#B92858", border: "2px solid #B92858" }}
                >
                  <ArrowLeft size={24} />
                </Button>
                <Form onSubmit={handleSubmit} className="w-100">
                  <InputGroup>
                    <InputGroup.Text className="bg-white border-2" style={{ border: "2px solid #B92858" }}>
                      <Search onClick={handleSubmit} color="#B92858" />
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

          <div className="d-flex justify-content-between align-items-center mb-3">
            <FilterButton activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            <Button variant="outline-dark" size="sm" onClick={resetAdvancedFilters}>
              Reset filtri avanzati
            </Button>
          </div>

          <Form onSubmit={handleSubmit} className="mb-4">
            <Row className="g-2 align-items-end">
              <Col xs={6} md={3}>
                <Form.Label>Data da</Form.Label>
                <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </Col>
              <Col xs={6} md={3}>
                <Form.Label>Data a</Form.Label>
                <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </Col>
              <Col xs={6} md={2}>
                <Form.Label>Importo min</Form.Label>
                <Form.Control
                  type="number"
                  value={minImporto}
                  onChange={(e) => setMinImporto(e.target.value)}
                  min={0}
                />
              </Col>
              <Col xs={6} md={2}>
                <Form.Label>Importo max</Form.Label>
                <Form.Control
                  type="number"
                  value={maxImporto}
                  onChange={(e) => setMaxImporto(e.target.value)}
                  min={0}
                />
              </Col>
              <Col xs={6} md={2}>
                <Form.Label>Anno</Form.Label>
                <Form.Control
                  type="number"
                  value={anno}
                  onChange={(e) => setAnno(e.target.value)}
                  placeholder="es. 2025"
                  min={2000}
                />
              </Col>
            </Row>
          </Form>

          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Button variant="outline-secondary" disabled={page === 0} onClick={() => handlePageChange(page - 1)}>
                ← Precedente
              </Button>
              <span>
                Pagina {page + 1} di {totalPages}
              </span>
              <Button
                variant="outline-secondary"
                disabled={page === totalPages - 1}
                onClick={() => handlePageChange(page + 1)}
              >
                Successiva →
              </Button>
            </div>
          )}

          <Row className="g-3">
            {result.map((fattura) => (
              <Col key={fattura.id} xs={12} md={6} lg={12}>
                <Card
                  className="cursor-pointer"
                  style={{
                    backgroundColor:
                      {
                        PAGATA: "#8cc152",
                        "NON PAGATA": "#d9534f",
                        "IN ATTESA": "#ffb400",
                      }[fattura.stato.nome] || "#6c757d",
                    color: "#fff",
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

          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center mt-4 gap-2">
              <Button variant="outline-secondary" disabled={page === 0} onClick={() => handlePageChange(page - 1)}>
                ← Precedente
              </Button>
              <span>
                Pagina {page + 1} di {totalPages}
              </span>
              <Button
                variant="outline-secondary"
                disabled={page === totalPages - 1}
                onClick={() => handlePageChange(page + 1)}
              >
                Successiva →
              </Button>
            </div>
          )}
        </Container>
        <NavbarUser />
      </Container>
    </>
  );
}

export default DashboardFatture;
