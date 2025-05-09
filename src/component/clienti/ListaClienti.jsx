import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import CardClienti from "./CardClienti";
import { useEffect, useState } from "react";

const ListaClienti = () => {
  const [clienti, setClienti] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/clienti?page=0&size=10&sort=ragioneSociale&sort=asc`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Errore nel caricamento");
        return response.json();
      })
      .then((data) => {
        setClienti(data.content);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4 border-bottom pb-2">Lista Clienti</h2>

      {isLoading && (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Caricamento clienti in corso...</p>
        </div>
      )}

      {hasError && (
        <Alert variant="danger" className="text-center">
          Si è verificato un errore nel caricamento dei clienti.
        </Alert>
      )}

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
              <p className="text-center text-muted">Nessun cliente disponibile.</p>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default ListaClienti;
