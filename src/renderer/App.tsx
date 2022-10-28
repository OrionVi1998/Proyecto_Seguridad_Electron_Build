/* eslint-disable react-hooks/exhaustive-deps */
import {
  MemoryRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import Cifrado from './components/Cifrado';
import Descifrado from './components/Descifrado';

const logoGrande =
  'https://cdn.discordapp.com/attachments/576565786630422548/1015367780259872838/logotipo_pag.png';

function LandingPage() {
  const nav = useNavigate();
  return (
    <Container className="childContainer">
      <Row
        className="justify-content-md-center"
        style={{ paddingTop: 50, paddingBottom: 50 }}
      >
        <Col md="auto">
          <img src={logoGrande} alt="" />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col
          md="auto"
          style={{ color: 'white', height: '100px', fontFamily: 'Fira Sans' }}
        >
          <p style={{ fontFamily: 'DM Sans', textAlign: 'center' }}>
            ¿QUERÉS COMPARTIR TUS CLAVES O GUARDARLAS DE FORMA DISCRETA?
            <br />
            HIDDENKEY BRINDA TODO ESTO POR MEDIO DE ESTEGANOGRAFÍA
          </p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button
            variant="success"
            onClick={() => nav('/cifrar')}
            className="greenButton"
            size="lg"
          >
            CIFRAR
          </Button>
        </Col>
        <Col md="auto">
          <Button
            variant="success"
            onClick={() => nav('/descifrar')}
            className="greenButton"
            size="lg"
          >
            DESCIFRAR
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

function Redirect() {
  const nav = useNavigate();
  useEffect(() => {
    nav('/home');
  }, []);
  return <></>;
}

export default function App() {
  return (
    <Router>
      <Navbar bg="dark" fixed="top" variant="dark">
        <Container>
          <Navbar.Brand>HiddenKey</Navbar.Brand>
          <Nav variant="tabs" className="me-auto">
            <Nav.Link as={NavLink} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cifrar">
              Cifrar
            </Nav.Link>
            <Nav.Link as={NavLink} to="/descifrar">
              Descifrar
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="mainContainer">
        <Routes>
          <Route path="/" element={<Redirect />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/cifrar" element={<Cifrado logoGrande={logoGrande} />} />
          <Route
            path="/descifrar"
            element={<Descifrado logoGrande={logoGrande} />}
          />
        </Routes>
      </div>
    </Router>
  );
}
