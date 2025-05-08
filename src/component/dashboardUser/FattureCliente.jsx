import { useEffect, useState } from "react";
import { Card, Col, Container, FormControl, InputGroup, Row } from "react-bootstrap";
import { useParams } from "react-router";

const FattureCliente = () => {

    const clienteId = useParams();
    const apiUrl = import.meta.env.VITE_API_URL;
    const [fatture, setFatture] = useState(null);

    useEffect(() => {
            fetch(apiUrl + "/fatture?idCliente=" + clienteId.id, {
    
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token"),
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                
                console.log("SONO DATA",data)
                setFatture(data); 
               
                               
            })
            .catch((error) => {
                console.error("Fetch error:", error);           
            })
           
        }, [clienteId.id]

            
        );

       

    return (
        <>
        
       {/*  <div className="fatture-container"> 
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
      </div> */}
      </>
    );
    }
export default FattureCliente;
