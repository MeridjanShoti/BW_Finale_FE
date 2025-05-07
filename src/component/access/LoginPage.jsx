import { Col, Container, Image, Row } from "react-bootstrap";
import MyLogin from "../auth/MyLogin";
import epic from "../../assets/img/epic.png";
import energy from "../../assets/img/energy.png";

const LoginPage = () => {
    return (
        <Container style={{ backgroundImage: `url(${energy})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
        }} >
            <Row xs= {2}>
                <Col>
    
                <Image src= {epic} alt="Logo" className="my-5" fluid style={{width: "150px"}}/>
    
    
                <div className="d-flex ">
                <div>   
                <h1 className="text-success m-0">Accedi</h1>
                </div>
                </div> 
                
                </Col>
    
                <Col>
                <div className=" border-end border-bottom rounded-3 p-4 mt-5" style={{backgroundColor: "#F8F7F5"}}> 
                <MyLogin />
                 </div>   
                
                </Col>
    
    
               
    
                
            </Row>
        
        </Container>
    
    
    );
    } 
export default LoginPage;