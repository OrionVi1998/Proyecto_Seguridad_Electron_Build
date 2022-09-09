import {
  MemoryRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Cifrar from './components/Cifrar';
import Descifrar from './components/Descifrar';

const LandingPage = () => {
  return <div className="LandingPage">Hi</div>;
};

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
