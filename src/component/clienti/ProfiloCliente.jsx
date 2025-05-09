import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button, Image, Modal, Form } from "react-bootstrap";
import { Link, useParams } from "react-router";

const ProfiloCliente = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const clienteId = useParams();
  const [cliente, setCliente] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nomeMittente: "",
    oggetto: "",
    messaggio: "",
  });

  useEffect(() => {
    fetch(`${apiUrl}/clienti/${clienteId.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nella risposta");
        return res.json();
      })
      .then((data) => setCliente(data))
      .catch((err) => console.error("Errore fetch:", err));
  }, [clienteId.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = () => {
    console.log("Messaggio inviato:", formData);
    // Qui puoi implementare la logica di invio (es. email, API)
    setShowModal(false);
    setFormData({ nomeMittente: "", oggetto: "", messaggio: "" });
  };

  if (!cliente) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <h4 className="mt-3">Caricamento in corso...</h4>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profilo Cliente</h1>

      <Card className="mb-4 shadow-sm">
        <Card.Body className="d-flex align-items-center">
          <Image src={cliente.logoAziendale} alt="Logo" roundedCircle width={100} height={100} className="me-4" />
          <div>
            <Card.Title>{cliente.ragioneSociale}</Card.Title>
            <Card.Subtitle className="text-muted">{cliente.tipoCliente}</Card.Subtitle>
          </div>
        </Card.Body>
      </Card>

      <Row className="g-3 mb-4">
        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Dettagli Azienda</Card.Title>
              <Card.Text>
                <strong>P. IVA:</strong> {cliente.partitaIva}
              </Card.Text>
              <Card.Text>
                <strong>Telefono sede:</strong> {cliente.telefono}
              </Card.Text>
              <Card.Text>
                <strong>Email PEC:</strong> {cliente.pec}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Contatto Referente</Card.Title>
              <Card.Text>
                <strong>Nome:</strong> {cliente.nomeContatto}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {cliente.emailContatto}
              </Card.Text>
              <Card.Text>
                <strong>Telefono:</strong> {cliente.telefonoContatto}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center">
        <Link to={`/fatture/${clienteId.id}`} state={cliente}>
          <Button variant="primary" className="me-3" size="lg">
            Vai alle Fatture
          </Button>
        </Link>
        <Button variant="success" size="lg" onClick={() => setShowModal(true)}>
          Contatta il cliente
        </Button>
      </div>

      {/* MODALE */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contatta il cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Oggetto</Form.Label>
              <Form.Control type="text" name="oggetto" value={formData.oggetto} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Messaggio</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="messaggio"
                value={formData.messaggio}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Destinatario</Form.Label>
              <Form.Select name="destinatario" value={formData.destinatario} onChange={handleChange}>
                <option value="">-- Seleziona un'email --</option>
                {cliente.pec && <option value={cliente.pec}>PEC: {cliente.pec}</option>}
                {cliente.email && <option value={cliente.email}>Email aziendale: {cliente.email}</option>}
                {cliente.emailContatto && (
                  <option value={cliente.emailContatto}>Email referente: {cliente.emailContatto}</option>
                )}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSend}>
            Invia messaggio
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfiloCliente;
