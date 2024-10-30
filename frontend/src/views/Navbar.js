import {useContext} from 'react'
import logo from '../nasfarm-logo.ico'
import { Link } from 'react-router-dom'
import '../styles/nav.css'
import { jwtDecode } from 'jwt-decode'
import AuthContext from '../context/AuthContext'
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';

function MyNavbar() {
  const {user, logoutUser} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  if (token){
    const decode = jwtDecode(token)
    var user_id = decode.user_id
  }


  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {/* <img style={{width:"120px", padding:"7px"}} src="https://i.imgur.com/juL1aAc.png" alt=""/> */}
            <img style={{width:"80px", height:"80px", padding:"7px", borderRadius:"50%"}} src={logo} alt=""/>

          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
              </li>
              {token === null &&
              <><li className="nav-item">
                <Link to="/login" className="nav-link" href="#">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link" href="#">Register</Link>
              </li>
              </>
               }
              
              {token !== null &&
              <><li className="nav-item">
                <Link to="/dashboard" className="nav-link" >Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={{cursor: "pointer"}} onClick={logoutUser}>Logout</Link>
              </li>
              </>
               }
              
            </ul>
          </div>
        </div>
      </nav>   

      <Navbar bg="dark" variant="dark" expand="lg" sticky="top" collapseOnSelect>
      <Container>
        <Navbar.Brand href="/">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/services">Services</Nav.Link>
            <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="/blog">Blog</NavDropdown.Item>
              <NavDropdown.Item href="/faq">FAQ</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/contact">Contact</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/login">
              <Button variant="outline-light" className="me-2">Login</Button>
            </Nav.Link>
            <Nav.Link href="/signup">
              <Button variant="light">Sign Up</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> 
      </div>
  )
}

export default MyNavbar
