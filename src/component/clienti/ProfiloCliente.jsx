import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Button, Image, Modal, Form, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import epic from "../../assets/img/epic.png";

const ProfiloCliente = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const clienteId = useParams();
  const [cliente, setCliente] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    oggetto: "",
    messaggio: "",
    destinatario: "",
    emailAlternativa: "",
  });
  const user = useSelector((state) => state.user.user);

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
    const destinatarioEffettivo = formData.emailAlternativa || formData.destinatario;

    if (!destinatarioEffettivo) {
      alert("Inserisci un destinatario valido.");
      return;
    }

    fetch(`${apiUrl}/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        to: destinatarioEffettivo,
        subject: formData.oggetto,
        body: formData.messaggio,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Errore nella risposta");
        await res.text(); // Anche se non serve il contenuto
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setShowModal(false);
          setFormData({
            oggetto: "",
            messaggio: "",
            destinatario: "",
            emailAlternativa: "",
          });
        }, 2000);
      })
      .catch((err) => console.error("Errore fetch:", err));
  };

  if (!cliente) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <h4 className="mt-3">Caricamento in corso...</h4>
      </Container>
    );
  }

  const sedeLegale = cliente.indirizzo.find((i) => i.tipoSede === "SEDE_LEGALE");
  const sedeOperativa = cliente.indirizzo.find((i) => i.tipoSede === "SEDE_OPERATIVA");

  return (
    <>
      <Card className="border-0 rounded-0">
        <Card.Body className="d-flex align-items-center justify-content-between" style={{ backgroundColor: "#f5f5f5" }}>
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
      <Container className="py-4">
        <h1 className="mb-4 text-center">Profilo Cliente</h1>

        <Card className="mb-4 shadow-sm">
          <Card.Body className="d-flex align-items-center">
            <Image src={cliente.logoAziendale} alt="Logo" roundedCircle width={100} height={100} className="me-4" />
            <div>
              <Card.Title>{cliente.ragioneSociale}</Card.Title>
              <Card.Subtitle className="text-muted">{cliente.tipoCliente}</Card.Subtitle>
              <p className="mb-0">
                <strong>Data inserimento:</strong> {cliente.dataInserimento}
              </p>
              <p className="mb-0">
                <strong>Ultimo contatto:</strong> {cliente.dataUltimoContatto}
              </p>
              <p className="mb-0">
                <strong>Fatturato annuale:</strong>{" "}
                {cliente.fatturatoAnnuale.toLocaleString("it-IT", { style: "currency", currency: "EUR" })}
              </p>
            </div>
          </Card.Body>
        </Card>

        <Row className="g-3 mb-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Contatti Azienda</Card.Title>
                <Card.Text>
                  <strong>P. IVA:</strong> {cliente.partitaIva}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {cliente.email}
                </Card.Text>
                <Card.Text>
                  <strong>PEC:</strong> {cliente.pec}
                </Card.Text>
                <Card.Text>
                  <strong>Telefono sede:</strong> {cliente.telefono}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Referente</Card.Title>
                <Card.Text>
                  <strong>Nome:</strong> {cliente.nomeContatto} {cliente.cognomeContatto}
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

        <Row className="g-3 mb-4">
          {sedeLegale && (
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Sede Legale</Card.Title>
                  <Card.Text>
                    {sedeLegale.via}, {sedeLegale.civico} - {sedeLegale.cap} {sedeLegale.localita} (
                    {sedeLegale.provinciaNome})
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
          {sedeOperativa && (
            <Col md={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Sede Operativa</Card.Title>
                  <Card.Text>
                    {sedeOperativa.via}, {sedeOperativa.civico} - {sedeOperativa.cap} {sedeOperativa.localita} (
                    {sedeOperativa.provinciaNome})
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          )}
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

        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Contatta il cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showAlert && <Alert variant="success">Messaggio inviato con successo!</Alert>}
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

              <Form.Group className="mb-3">
                <Form.Label>Email alternativa (opzionale)</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Inserisci un'altra email"
                  name="emailAlternativa"
                  value={formData.emailAlternativa}
                  onChange={handleChange}
                />
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
    </>
  );
};

export default ProfiloCliente;
