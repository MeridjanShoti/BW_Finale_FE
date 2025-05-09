import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, InputGroup, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router";
import successIcon from "../../assets/img/success.png";
import iconWarning from "../../assets/img/iconWarning.png";
import iconDanger from "../../assets/img/iconDanger.png";
import { Image } from "react-bootstrap";
import FilterButton from "../filtroFatture/FilterButton";
import { ArrowLeft, Search } from "react-bootstrap-icons";

const FattureCliente = () => {
  const clienteId = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [fatture, setFatture] = useState([]);
  const [ragioneSociale, setRagioneSociale] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Tutte");
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const filtered = fatture.filter((filterColor) => {
    const statoNome = filterColor.stato.nome.toLowerCase();
    const filtroNome = activeFilter.toLowerCase();

    const matchesFilter = filtroNome === "tutte" || statoNome === filtroNome;
    const matchesSearch = filterColor.numero?.toString().includes(search);
    return matchesFilter && (!search || matchesSearch);
  });

  return (
    <>
      {fatture.length > 0 ? (
        <>
          <Container className="d-flex justify-content-center align-items-center">
            <div className="w-100">
              <h1 className="my-4 text-center">Fatture del cliente {ragioneSociale}</h1>
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
          </Container>
          <FilterButton activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <div className="fatture-container">
            <Container>
              <Row className="g-3">
                {filtered.map((fattura) => (
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
                          <small>
                            Stato:{" "}
                            {fattura.stato.nome.charAt(0).toUpperCase() + fattura.stato.nome.slice(1).toLowerCase()}
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
          </div>
        </>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};
export default FattureCliente;
