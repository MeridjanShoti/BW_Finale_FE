import { Col, Container, Row, Spinner, Alert, Button, Modal, Form } from "react-bootstrap";
import CardClienti from "./CardClienti";
import { useEffect, useState } from "react";

const ListaClienti = () => {
  const [clienti, setClienti] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    nomeParziale: "",
    dataInserimento: "",
    dataUltimoContatto: "",
    fatturatoAnnuale: "",
  });
  const [formData, setFormData] = useState({
    ragioneSociale: "",
    partitaIva: "",
    email: "",
    dataInserimento: "",
    dataUltimoContatto: "",
    fatturatoAnnuale: "",
    pec: "",
    telefono: "",
    nomeContatto: "",
    cognomeContatto: "",
    emailContatto: "",
    telefonoContatto: "",
    logoAziendale: "",
    tipoCliente: "PA",
    indirizzo: [
      {
        via: "",
        civico: "",
        cap: "",
        localita: "",
        tipoSede: "SEDE_LEGALE",
        comuneId: 0,
        clienteId: 0,
      },
      {
        via: "",
        civico: "",
        cap: "",
        localita: "",
        tipoSede: "SEDE_OPERATIVA",
        comuneId: 0,
        clienteId: 0,
      },
    ],
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchClienti = () => {
    setIsLoading(true);
    const query = new URLSearchParams({
      page: 0,
      size: 10,
      sort: ["ragioneSociale", "asc"],
      ...Object.entries(filters)
        .filter(([_, v]) => v)
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}),
    }).toString();

    fetch(`${apiUrl}/clienti?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nel caricamento");
        return res.json();
      })
      .then((data) => {
        setClienti(data.content);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setHasError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchClienti();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("indirizzo.")) {
      const parts = name.split(".");
      const index = parseInt(parts[1], 10); // 0 o 1
      const field = parts[2];

      const updatedAddress = [...formData.indirizzo];
      updatedAddress[index][field] = field === "comuneId" || field === "clienteId" ? parseInt(value) : value;

      setFormData((prev) => ({
        ...prev,
        indirizzo: updatedAddress,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const today = new Date().toISOString().split("T")[0];

      const sedeLegale = {
        ...formData.indirizzo[0],
        tipoSede: "SEDE_LEGALE",
        comuneId: formData.indirizzo[0].comuneId || 1,
        clienteId: formData.indirizzo[0].clienteId || 0,
      };

      const sedeOperativaPresente =
        formData.indirizzo[1] &&
        ["via", "civico", "cap", "localita"].some((field) => formData.indirizzo[1][field]?.trim() !== "");

      const indirizzi = [sedeLegale];

      if (sedeOperativaPresente) {
        indirizzi.push({
          ...formData.indirizzo[1],
          tipoSede: "SEDE_OPERATIVA",
          comuneId: formData.indirizzo[1].comuneId || 1,
          clienteId: formData.indirizzo[1].clienteId || 0,
        });
      }

      const payload = {
        ...formData,
        dataInserimento: today,
        dataUltimoContatto: today,
        fatturatoAnnuale: parseFloat(formData.fatturatoAnnuale) || 0,
        logoAziendale:
          formData.logoAziendale.trim() !== ""
            ? formData.logoAziendale
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.ragioneSociale)}`,
        indirizzo: indirizzi,
      };

      const res = await fetch(`${apiUrl}/clienti`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Errore nell'invio");

      setShowModal(false);
      fetchClienti();

      // Reset form
      setFormData({
        ragioneSociale: "",
        partitaIva: "",
        email: "",
        dataInserimento: "",
        dataUltimoContatto: "",
        fatturatoAnnuale: "",
        pec: "",
        telefono: "",
        nomeContatto: "",
        cognomeContatto: "",
        emailContatto: "",
        telefonoContatto: "",
        logoAziendale: "",
        tipoCliente: "PA",
        indirizzo: [
          {
            via: "",
            civico: "",
            cap: "",
            localita: "",
            tipoSede: "SEDE_LEGALE",
            comuneId: 0,
            clienteId: 0,
          },
          {
            via: "",
            civico: "",
            cap: "",
            localita: "",
            tipoSede: "SEDE_OPERATIVA",
            comuneId: 0,
            clienteId: 0,
          },
        ],
      });
    } catch (err) {
      alert("Errore durante l'inserimento del cliente");
      console.error(err);
    }
  };
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchClienti();
  };

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Lista Clienti</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          + Aggiungi Cliente
        </Button>
      </div>

      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="g-2">
          <Col md>
            <Form.Control
              type="text"
              name="nomeParziale"
              placeholder="Nome parziale"
              value={filters.nomeParziale}
              onChange={handleFilterChange}
            />
          </Col>
          <Col md>
            <Form.Control
              type="date"
              name="dataInserimento"
              placeholder="Data Inserimento"
              value={filters.dataInserimento}
              onChange={handleFilterChange}
            />
          </Col>
          <Col md>
            <Form.Control
              type="date"
              name="dataUltimoContatto"
              placeholder="Data Ultimo Contatto"
              value={filters.dataUltimoContatto}
              onChange={handleFilterChange}
            />
          </Col>
          <Col md>
            <Form.Control
              type="number"
              name="fatturatoAnnuale"
              placeholder="Fatturato Annuale"
              value={filters.fatturatoAnnuale}
              onChange={handleFilterChange}
            />
          </Col>
          <Col md="auto">
            <Button type="submit" variant="primary">
              Cerca
            </Button>
          </Col>
        </Row>
      </Form>

      {isLoading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-2">Caricamento clienti...</p>
        </div>
      )}

      {hasError && <Alert variant="danger">Errore nel caricamento dei clienti.</Alert>}

      {!isLoading && !hasError && (
        <Row className="g-4">
          {clienti.length > 0 ? (
            clienti.map((cliente) => (
              <Col key={cliente.id} xs={12} sm={6} md={4} lg={3}>
                <CardClienti cliente={cliente} />
              </Col>
            ))
          ) : (
            <Col>
              <p className="text-center">Nessun cliente trovato.</p>
            </Col>
          )}
        </Row>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nuovo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {[
              ["ragioneSociale", "Ragione Sociale", true],
              ["partitaIva", "Partita IVA", true],
              ["email", "Email", true],
              ["pec", "PEC", true],
              ["telefono", "Telefono", false],
              ["nomeContatto", "Nome Contatto", false],
              ["cognomeContatto", "Cognome Contatto", false],
              ["emailContatto", "Email Contatto", false],
              ["telefonoContatto", "Telefono Contatto", false],
              ["logoAziendale", "URL Logo Aziendale", false],
            ].map(([name, label, isRequired]) => (
              <Form.Group key={name} className="mb-3">
                <Form.Label>
                  {label} {isRequired && <span style={{ color: "red" }}>*</span>}
                </Form.Label>
                <Form.Control
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required={isRequired}
                />
              </Form.Group>
            ))}

            <Form.Group className="mb-3">
              <Form.Label>Tipo Cliente</Form.Label>
              <Form.Select name="tipoCliente" value={formData.tipoCliente} onChange={handleChange}>
                <option value="PA">Pubblica Amministrazione</option>
                <option value="SRL">SRL</option>
                <option value="SPA">SPA</option>
              </Form.Select>
            </Form.Group>

            <hr />
            <h5 className="mb-3">Indirizzi Cliente</h5>
            <Row className="mb-3">
              <Col md={6}>
                <h6>Sede Legale</h6>
                {["via", "civico", "cap", "localita"].map((field) => (
                  <Form.Group key={`legale-${field}`} className="mb-2">
                    <Form.Label>{field.toUpperCase()}</Form.Label>
                    <Form.Control
                      type="text"
                      name={`indirizzo.0.${field}`}
                      value={formData.indirizzo[0][field]}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                ))}
              </Col>

              <Col md={6}>
                <h6>Sede Operativa (opzionale)</h6>
                {["via", "civico", "cap", "localita"].map((field) => (
                  <Form.Group key={`operativa-${field}`} className="mb-2">
                    <Form.Label>{field.toUpperCase()}</Form.Label>
                    <Form.Control
                      type="text"
                      name={`indirizzo.1.${field}`}
                      value={formData.indirizzo[1][field]}
                      onChange={handleChange}
                    />
                  </Form.Group>
                ))}
              </Col>
            </Row>

            <div className="text-end">
              <Button variant="secondary" onClick={() => setShowModal(false)} className="me-2">
                Annulla
              </Button>
              <Button type="submit" variant="primary">
                Salva
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ListaClienti;
