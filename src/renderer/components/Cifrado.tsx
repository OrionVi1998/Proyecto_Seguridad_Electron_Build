import { Button, Col, Container, Row } from 'react-bootstrap';
import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';
import { JSEncrypt } from 'jsencrypt';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { PNG } from 'pngjs/browser';
import { encode } from '../utilidad/png_hider';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface photo {
  bufferImg: any;
  src: any;
  file: any;
}

function Cifrado({ logoGrande }: { logoGrande: string }) {
  const [clavePublica, setClavePublica] = useState('');
  const [texto, setTexto] = useState('');

  const [foto, setFoto] = useState<photo>({
    bufferImg: undefined,
    src: undefined,
    file: undefined,
  });

  const [disabled, setDisabled] = useState<boolean>(true);

  function cifrarTexto() {
    const encrypt = new JSEncrypt();

    encrypt.setPublicKey(clavePublica);
    let textoEncryptado = encrypt.encrypt(texto);

    if (textoEncryptado === false) {
      textoEncryptado = texto;
      alert(
        'Clave Publica Invalida. El texto se incorporara a la imagen sin encripcion'
      );
    }

    encode(foto.bufferImg, textoEncryptado)
      .then((data) => {
        const buffer = PNG.sync.write(data);

        const BlobToDownload = new Blob([buffer], { type: 'image/png' });
        const pngFile = window.URL.createObjectURL(BlobToDownload);
        const tempLink = document.createElement('a');
        tempLink.href = pngFile;
        tempLink.setAttribute('download', 'filename.png');
        tempLink.click();

        return true;
      })
      .catch((e) => {
        return e;
      });
  }

  function handleUploadPicture(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const buf = Buffer.from(reader.result.split(',')[1], 'base64');

      setFoto({
        bufferImg: buf,
        src: reader.result,
        file: event.target.files[0],
      });
    };
  }

  useEffect(() => {
    setDisabled(clavePublica === '' || texto === '' || foto.bufferImg === '');
  }, [clavePublica, texto, foto]);

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
            disabled={disabled}
          >
            CIFRAR
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Cifrado;
