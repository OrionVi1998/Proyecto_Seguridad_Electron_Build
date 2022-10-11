import { Col, Container, Row } from 'react-bootstrap';

function Cifrado({ logoGrande }: { logoGrande: string }) {
  return (
    <Container className="childContainer" style={{ padding: 20 }}>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <img src={logoGrande} style={{ maxWidth: 350, padding: 20 }} alt="" />
        </Col>
      </Row>
    </Container>
  );
}

export default Cifrado;
