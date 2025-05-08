import { Col, Container, Row } from "react-bootstrap";
import CardClienti from "./CardClienti";
import { useEffect, useState } from "react";

const ListaClienti = () => {

    const [clienti, setClienti] = useState([]);
    const apiUrl= import.meta.env.VITE_API_URL;

useEffect(() => {
        fetch(apiUrl + "/clienti?page=0&size=10&sort=ragioneSociale&sort=asc", {
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
            console.log(data);
            setClienti(data.content); 
           
                           
        })
        .catch((error) => {
            console.error("Fetch error:", error);           
        })}, []
    );


 

   


    return (
       <Container>

        <Row xs={4}>
            {clienti.map((cliente) => (
                <Col key={cliente.id}>
                    <CardClienti cliente={cliente}/>
                </Col>
                  
                ))
                }
          
            
        </Row>
       </Container>
    );
    }
export default ListaClienti;