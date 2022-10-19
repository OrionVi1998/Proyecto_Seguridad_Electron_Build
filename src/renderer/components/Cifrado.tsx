import { Button, Col, Container, Row } from 'react-bootstrap';
import { Buffer } from 'buffer';
import { useState } from 'react';
import { JSEncrypt } from 'jsencrypt';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface photo {
  bufferImg: any;
  src: any;
  file: any;
}

function Cifrado({ logoGrande }: { logoGrande: string }) {
  const [clavePublica, setClavePublica] = useState('');
  const [texto, setTexto] = useState('');

  const [, setResultadoEncriptado] = useState<any>('');

  const [foto, setFoto] = useState<photo>({
    bufferImg: undefined,
    src: undefined,
    file: undefined,
  });

  function cifrarTexto() {
    const encrypt = new JSEncrypt();

    encrypt.setPublicKey(clavePublica);
    const textoEncryptado = encrypt.encrypt(texto);

    setResultadoEncriptado(textoEncryptado);

    const originalImg = foto.bufferImg;

    const data = new Blob([originalImg], { type: 'image/png' });
    // eslint-disable-next-line no-console
    console.log('File', data);
    const pngFile = window.URL.createObjectURL(data);
    const tempLink = document.createElement('a');
    tempLink.href = pngFile;
    tempLink.setAttribute('download', 'filename.png');
    tempLink.click();
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
      const buf = Buffer.from(reader.result.split(',')[1], 'base64');
      console.log('Result', reader.result);
      console.log('Target', event.target.files[0]);
      console.log('Buffer', buf);
      setFoto({
        bufferImg: buf,
        src: reader.result,
        file: event.target.files[0],
      });
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
          <label>INGRESE LA CLAVE PÚBLICA</label>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <input
            type="text"
            id="clave"
            required
            placeholder="clave pública"
            onChange={(event) => setClavePublica(event.target.value)}
          />
        </Col>
      </Row>

      <Row className="justify-content-md-center" style={{ paddingTop: 15 }}>
        <Col md="auto">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>INGRESAR LA CONTRASEÑA</label>
        </Col>
      </Row>

      <Row className="justify-content-md-center">
        <Col md="auto">
          <input
            type="text"
            id="texto-a-cifrar"
            required
            placeholder="texto a cifrar"
            onChange={(event) => setTexto(event.target.value)}
          />
        </Col>
      </Row>

      <Row className="justify-content-md-center" style={{ paddingTop: 15 }}>
        <Col md="auto">
          <input type="file" onChange={(e) => handleUploadPicture(e)} />
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
            CIFRAR
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Cifrado;
