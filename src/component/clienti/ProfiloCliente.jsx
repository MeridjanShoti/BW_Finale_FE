import { useEffect, useState } from "react";
import { Container} from "react-bootstrap";
import { Link, useParams } from "react-router";


const ProfiloCliente = () => {


   

    const apiUrl = import.meta.env.VITE_API_URL;

    const clienteId = useParams();

    const [cliente, setCliente] = useState(null);


useEffect(() => {

    
        fetch(apiUrl + "/clienti/" + clienteId.id, {

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
            setCliente(data); 
           
                           
        })
        .catch((error) => {
            console.error("Fetch error:", error);           
        })}, [clienteId.id]
    );


  return (
    <>
      {cliente ? (
        <Container>
          <h1>Profilo</h1>
          <div className="d-flex align-items-center gap-3 mb-3 position-relative">
            
            <img src={cliente.logoAziendale} alt="Avatar" width="100" height="100" />
            <h3>{cliente.ragioneSociale}</h3>
          </div>

          <div className="d-flex align-items-center gap-3 mb-3">
            <p className="mb-0">Telefono sede: </p> <p className="mb-0">{cliente.telefono}</p>
          </div>

          <div className="d-flex align-items-center gap-3 mb-3">
            <p className="mb-0">P. IVA:  </p> <p className="mb-0">{cliente.partitaIva}</p>
          </div>

          <div className="d-flex align-items-center gap-3 mb-3">
            <p className="mb-0">Denominazione commerciale:  </p> <p className="mb-0">{cliente.tipoCliente}</p>
          </div>

          <h3>Informazioni di contatto:  </h3>


          <div className="d-flex align-items-center gap-3 mb-3">
            <p className="mb-0">Nome: </p> <p className="mb-0">{cliente.nomeContatto}</p>
          </div>
         
          <div className="d-flex align-items-center gap-3 mb-3">
            <p className="mb-0">Email: </p> <p className="mb-0">{cliente.email}</p>
          </div>

          <div className="d-flex align-items-center gap-3 mb-3">
            <p className="mb-0">Telefono: </p> <p className="mb-0">{cliente.telefonoContatto}</p>
          </div>
         
         <Link to= {"/fatture/" + clienteId.id} state={cliente} as={Link} className="btn btn-primary">Vai alle fatture</Link>   
        </Container>
      ) : (
        <div>
          <h1>Caricamento in corso...</h1>
        </div>
      )}
    </>
    );
    }   
export default ProfiloCliente;