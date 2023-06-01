import Button  from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./App.css";
import { useEffect, useState } from 'react';
import axios from 'axios';
import paisesJson from "./mock_api/paises.json";

function BasicExample(){
  const [paises, setPaises] = useState([]);
  const [nombre, setNombre] = useState("");
  const [selectPais, setSelectPais] = useState("");
  const [errorNombre, seterrorNombre] = useState(false);
  const [errorSelectPais, setErrorSelectPais] = useState(false);
  const [responseApi, setResponseApi] = useState("");

  useEffect(() => {
    /*axios.get("http://country.io/names.json")
    .then(res => {
      console.log(res)
      setPaises(res)})*/
      setPaises(paisesJson);
  }, []);

  const validacionForm = async () => {
    if(nombre.length > 0 && selectPais.length > 0){
      try {
        const resp = await axios.post('http://localhost:4000', {nombre, pais: selectPais });
        setResponseApi(resp.data.message);
        setNombre("");
        setSelectPais("");
        console.log(resp);
      } catch(err) {
        console.log(err);
      }
    }
    if (nombre.length > 0) seterrorNombre(false);
    else seterrorNombre(true);
    
    if (selectPais.length > 0) setErrorSelectPais(false);
    else setErrorSelectPais(true);
  } 

  return(
    <Form className='styleForm'>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
      <Form.Label>Nombre</Form.Label>
        <Form.Control type='email' placeholder='Nombre' value={ nombre } onChange={ event => {setNombre(event.target.value) } }/>
        { errorNombre && <p className='stylep'>Este campo es obligatorio</p>}
      </Form.Group>
      <Form.Group className='mb-3' controlId='formBasicEmail'>
        <Form.Label>País</Form.Label>
        <Form.Select aria-label='Default select example' value={ selectPais } onChange={event => {setSelectPais(event.target.value)}}>
          <option value="">Selecciones un país</option>
          {Object.entries(paises).map((el, i) => <option key={i} value={el[0]}>{el[1]}</option>)}
        </Form.Select>
        { errorSelectPais && <p className='stylep'>Es obligatorio seleccionar un país</p>}
      </Form.Group>
      <br></br>
      <p>{responseApi}</p>
      <Button variant='success' onClick={validacionForm}>Enviar</Button>
    </Form>
  );
}

export default BasicExample;