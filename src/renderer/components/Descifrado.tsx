import { useState } from 'react';
import { JSEncrypt } from 'jsencrypt';
import { Buffer } from 'buffer';
import { Button, Col, Container, Row } from 'react-bootstrap';

function Descifrado({ logoGrande }: { logoGrande: string }) {
  const [clavePrivada, setClavePrivada] = useState('');

  const [, setResultadoDescriptado] = useState<any>('');

  const [foto, setFoto] = useState<any>('');

  function cifrarTexto() {
    const privateKey = clavePrivada;

    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);

    const uncrypted = decrypt.decrypt('TextoDeFoto');

    setResultadoDescriptado(uncrypted);
  }

  function handleUploadPicture(event: any) {
    // event.target.files[0].text().then(r => {
    //   console.log(r)
    // })

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // reader.readAsBinaryString(event.target.files[0])

    reader.onloadend = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const buf = Buffer.from(reader.result, 'base64');
      console.log(reader.result);
      console.log(event.target.files[0]);
      console.log(buf);
      setFoto({ bufferImg: buf, src: reader.result });
    };
  }

  return (
    <Container className="childContainer" style={{ padding: 20 }}>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <img src={logoGrande} style={{ maxWidth: 350, padding: 20 }} alt="" />
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>INGRESE LA CLAVE PRIVADA</label>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <input
            type="text"
            id="clave"
            required
            placeholder="clave privada"
            onChange={(event) => setClavePrivada(event.target.value)}
          />
        </Col>
      </Row>

      <Row className="justify-content-md-center" style={{ paddingTop: 15 }}>
        <Col md="auto">
          <input type="file" onChange={handleUploadPicture} />
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          {foto ? (
            <img
              src={foto.src}
              alt=""
              style={{
                maxWidth: '300px',
                width: 'auto',
                justifyContent: 'center',
                padding: '20px',
              }}
            />
          ) : (
            ''
          )}
        </Col>
      </Row>

      <Row className="justify-content-md-center" style={{ paddingTop: 15 }}>
        <Col md="auto">
          <Button
            id="cifrar"
            variant="success"
            size="lg"
            className="greenButton"
            onClick={() => cifrarTexto()}
          >
            DESCIFRAR
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Descifrado;
