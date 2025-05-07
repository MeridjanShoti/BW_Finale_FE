import react from "react";
import LinkProfile from "../../assets/img/Link-Profile.png";
import LinkEnergy from "../../assets/img/linkEnergy.png";
import LinkSetting from "../../assets/img/LinkSetting.png";
import LinkFatture from "../../assets/img/linkFatture.png";
import LinkLogout from "../../assets/img/linkLogout.png";
import { Nav, Image } from "react-bootstrap";
import { Link } from "react-router";

const NavbarUser =() => {
  return (
    <>
      <Nav fill className="position-fixed bottom-0 start-0 w-100 border-top d-lg-none bg-white">
        <Nav.Item>
          <Nav.Link className="nav-icon--lower">
            <Image src={LinkProfile}></Image>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-icon--lower" as={Link} to="/dashboardFatture">
            <Image src={LinkFatture}></Image>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="fs-4" as={Link} to="/dashboardUser">
            <Image src={LinkEnergy}></Image>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-icon--lower">
            <Image src={LinkSetting}></Image>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className="nav-icon--lower" as={Link} to="/login">
            <Image src={LinkLogout}></Image>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
}

export default NavbarUser;