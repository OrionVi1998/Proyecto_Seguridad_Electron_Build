import {
  MemoryRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Nav, Navbar, Row } from 'react-bootstrap';
import Cifrar from './components/Cifrar';
import Descifrar from './components/Descifrar';

const logoGrande =
  'https://cdn.discordapp.com/attachments/576565786630422548/1015367780259872838/logotipo_pag.png';

function LandingPage() {
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
            // onClick={() => setTab('Cifrado')}
            className="greenButton"
            size="lg"
          >
            CIFRAR
          </Button>
        </Col>
        <Col md="auto">
          <Button
            variant="success"
            // onClick={() => setTab('Descifrado')}
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

export default function App() {
  return (
    <Router>
      <Navbar bg="dark" fixed="top" variant="dark">
        <Container>
          <Navbar.Brand>HiddenKey</Navbar.Brand>
          <Nav variant="tabs" className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Cifrar">
              Cifrar
            </Nav.Link>
            <Nav.Link as={NavLink} to="/Descifrar">
              Descifrar
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="Cifrar" element={<Cifrar />} />
        <Route path="Descifrar" element={<Descifrar />} />
      </Routes>
    </Router>
  );
}
