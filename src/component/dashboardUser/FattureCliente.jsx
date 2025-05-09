import { useEffect, useState } from "react";
import { Card, Col, Container, FormControl, InputGroup, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import successIcon from "../../assets/img/success.png";
import iconWarning from "../../assets/img/iconWarning.png";
import iconDanger from "../../assets/img/iconDanger.png";
import { Image } from "react-bootstrap";
import FilterButton from "../filtroFatture/FilterButton";

const FattureCliente = () => {
  const clienteId = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [fatture, setFatture] = useState([]);
  const [ragioneSociale, setRagioneSociale] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tutte");

  useEffect(() => {
    fetch(apiUrl + "/fatture?idCliente=" + clienteId.id + "&sort=numero&sort=asc", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data: ", data);
        setFatture(data.content);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });

    fetchRagioneSociale();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clienteId.id, apiUrl]);

  const fetchRagioneSociale = async () => {
    try {
      const response = await fetch(apiUrl + "/clienti/" + clienteId.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return setRagioneSociale(data.ragioneSociale);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const filtered = fatture.filter((filterColor) => {
    const matchesFilter = activeFilter === "Tutte" || filterColor.stato === activeFilter;
    const matchesSearch = filterColor.id.toString().includes(search);
    return matchesFilter && (!search || matchesSearch);
  });

  return (
    <>
      {fatture.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="my-4">Fatture del cliente {ragioneSociale}</h1>
            <InputGroup className="mb-3 w-25">
              <FormControl
                placeholder="Cerca"
                aria-label="Cerca"
                aria-describedby="basic-addon2"
                /* onChange={(e) => setSearchQuery(e.target.value)} */
              />
            </InputGroup>
          </div>

          <div className="fatture-container">
            <FilterButton activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            <Container>
              <Row className="g-3">
                {fatture.map((fattura) => (
                  <Col key={fattura.id} xs={12} md={6} lg={12}>
                    <Card
                      style={{
                        backgroundColor: {
                          PAGATA: "#8cc152",
                          "NON PAGATA": "#d9534f",
                          "IN ATTESA": "#ffb400",
                        }[fattura.stato.nome],
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                      }}
                      // onClick={() => navigate("/dashboardFatture")}
                    >
                      <Card.Body>
                        <Card.Title className="h5">Fattura N° {fattura.numero}</Card.Title>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small>Stato: {fattura.stato.nome}</small>
                          {fattura.stato.nome === "PAGATA" && <Image src={successIcon} width={24} />}
                          {fattura.stato.nome === "IN ATTESA" && <Image src={iconWarning} width={24} />}
                          {fattura.stato.nome === "NON PAGATA" && <Image src={iconDanger} width={24} />}
                        </div>
                        <hr style={{ borderColor: "rgba(255,255,255,0.5)" }} />
                        <Card.Text>Data: {fattura.data}</Card.Text>
                        <Card.Text>Importo: {fattura.importo}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};
export default FattureCliente;
