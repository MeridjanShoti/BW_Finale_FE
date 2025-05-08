import { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";

function MyNavBar() {
  console.log("Link is", Link);

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary d-none d-lg-block">
        <Container>
          <Navbar.Brand as={Link} to="/">
            React-Bootstrap
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className={window.location.pathname === "/" && "active"}>
                Home
              </Nav.Link>
              <Nav.Link to="/">Link</Nav.Link>
              <Nav.Link
                as={Link}
                to="/dashboardUser"
                className={window.location.pathname === "/dashboard" ? "active" : ""}
              >
                Dashboard user
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {user ? (
            <NavDropdown title={user.nome} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/profile">
                Profilo
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <div className="d-flex gap-3">
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Registrati
                </Nav.Link>
              </div>
            </>
          )}
        </Container>
      </Navbar>
    </div>
  );
}
export default MyNavBar;
