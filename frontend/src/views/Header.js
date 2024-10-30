import React, { useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../context/AuthContext";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/images/nasfarm-logo.jpg";
import "../styles/nav.css";

const MyNavbar = () => {
  // const [expanded, setExpanded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handleToggle = (event) => {
    event.preventDefault(); // Prevent default behavior
    setExpanded((prevExpanded) => !prevExpanded);
  };


  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");
  let user_id;

  if (token) {
    const decode = jwtDecode(token);
    user_id = decode.user_id;
  }

  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      bg="dark"
      variant="dark"
      sticky="top"
    >
      <Container>
        <Link to="/">
          <img
            style={{
              width: "80px",
              height: "80px",
              padding: "7px",
              borderRadius: "50%",
            }}
            src={logo}
            alt="Nasfarm Logo"
          />
        </Link>

        <Nav>
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link
              as={ScrollLink}
              to="services"
              smooth={true}
              duration={200}
            >
              Services
            </Nav.Link>
            <Nav.Link as={ScrollLink} to="contact" smooth={true} duration={200}>
              Contact
            </Nav.Link>
          </Nav>
          {token ? (
            <>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
              <Nav.Link
                as={Link}
                onClick={logoutUser}
                style={{ cursor: "pointer" }}
              >
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Button
                variant="outline-info"
                className="ms-2"
                as={Link}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="outline-info"
                className="ms-2"
                as={Link}
                to="/register"
              >
                Register
              </Button>
            </>
          )}
        </Nav>
        {/* <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          // onClick={() => setExpanded(expanded ? false : true)}
          onClick={handleToggle}
        /> */}

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link
              as={ScrollLink}
              to="services"
              smooth={true}
              duration={200}
            >
              Services
            </Nav.Link>
            <Nav.Link as={ScrollLink} to="contact" smooth={true} duration={200}>
              Contact
            </Nav.Link>
          </Nav>
          <Nav>
            {token ? (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  onClick={logoutUser}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Button
                  variant="outline-info"
                  className="ms-2"
                  as={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  variant="outline-info"
                  className="ms-2"
                  as={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
