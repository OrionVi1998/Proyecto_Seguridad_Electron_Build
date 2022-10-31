import { useEffect, useState } from 'react';
import { JSEncrypt } from 'jsencrypt';
import { Buffer } from 'buffer';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { decode } from '../utilidad/png_hider';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface photo {
  bufferImg: any;
  src: any;
  file: any;
}

function Descifrado({ logoGrande }: { logoGrande: string }) {
  const [clavePrivada, setClavePrivada] = useState('');

  const [textoImagenRaw, setTextoImagenRaw] = useState<string>('');
  const [textoDescifrado, setTextoDes] = useState<string>('');

  const [foto, setFoto] = useState<photo>({
    bufferImg: undefined,
    src: undefined,
    file: undefined,
  });

  const [disabled, setDisabled] = useState<boolean>(true);

  function decifrarTexto() {
    /* Funcion de descifrado de texto */
    const privateKey = clavePrivada;

    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);

    let uncrypted = String(decrypt.decrypt(textoImagenRaw));

    if (uncrypted === 'false') {
      uncrypted = 'CLAVE PRIVADA INVALIDA';
    }

    setTextoDes(uncrypted);
  }

  function handleUploadPicture(event: any) {
    /* Funcion de descifrado cuando se sube una foto */

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

      decode(buf)
        .then((r) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setTextoImagenRaw(r);
          return true;
        })
        .catch((e) => {
          return e;
        });
    };
  }

  useEffect(() => {
    /* Funcion de control de habilitacion del boton */
    setDisabled(foto.bufferImg === undefined || clavePrivada === '');
  }, [clavePrivada, foto, textoImagenRaw]);

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
            accept="image/png"
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

      {textoImagenRaw && textoDescifrado === '' ? (
        <>
          <br />
          <Row className="justify-content-md-center">
            <Col md="auto">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>TEXTO EN IMAGEN</label>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col md="auto">
              <textarea id="clave" disabled value={textoImagenRaw} />
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}

      <Row className="justify-content-md-center" style={{ paddingTop: 15 }}>
        <Col md="auto">
          <Button
            id="cifrar"
            variant="success"
            size="lg"
            className="greenButton"
            onClick={() => decifrarTexto()}
            disabled={disabled}
          >
            DESCIFRAR
          </Button>
        </Col>
      </Row>

      {textoDescifrado ? (
        <>
          <br />
          <Row className="justify-content-md-center">
            <Col md="auto">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>MENSAJE DESCIFRADO</label>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col md="auto">
              <textarea id="clave" disabled value={textoDescifrado} />
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default Descifrado;
