import React from "react";
import { Form, Input, Button, Modal, Select } from "antd";
import { CalculatorOutlined } from "@ant-design/icons";
import './ModalCalculo.css'
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";




const ModalCalculo = (props) => {

  const [dataICMS, setDataICMS] = useState([]);
  const [icmsSelecionado, setIcmsSelecionado] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [resultado, setResultado] = useState(0);
  const [acrecimo, setAcrecimo] = useState(0);

  useEffect(() => {
    axios.get(`https://spring-react-gestor-fiscal-production.up.railway.app/api/icms`)
      .then(res => {
        const dataICMS = res.data;
        setDataICMS(dataICMS);
      })
  }, []);

  const handleChangeSelected = (icms) => {
    setIcmsSelecionado(icms);
  }

  const calcularIcms = () => {
  if (icmsSelecionado === 0) {
    alert("Selecione um ICMS");
  } else {
    var porcentagem = icmsSelecionado / 100;
    var acrecimo = props.valorModal * porcentagem;
    var resultadoFinal = props.valorModal + acrecimo;
    resultadoFinal = resultadoFinal.toLocaleString ('pt-BR', {style: 'currency', currency: 'BRL'});
    acrecimo = acrecimo.toLocaleString ('pt-BR', {style: 'currency', currency: 'BRL'});
    setAcrecimo(acrecimo);
    setResultado(resultadoFinal);
    setMostrarResultado(true);
    }
  }




  return (

  

  <Modal
  title="Cálculo do ICMS"
  open={props.open}
  onCancel={ () => 
    props.fechaModal() &
    setMostrarResultado(false)
    & setIcmsSelecionado(0)
  }
  footer={null}
  destroyOnClose={true}
>
  <Form>
    <Form.Item name="id-produto" onChange={props.handleChangeId} label="Id do produto">
      <Input type={"number"} defaultValue={props.idModal} disabled />
    </Form.Item>
    <Form.Item name="nome-produto" onChange={props.handleChangeName} label="Nome do produto">
      <Input defaultValue={props.nomeModal} disabled />
    </Form.Item>
    <Form.Item name="valor-produto" onChange={props.handleChangeValue} label="Valor">
      <Input type={"number"} defaultValue={props.valorModal} disabled />
    </Form.Item>
    <Form.Item name="estado"  label="Estado" >
      <Select onChange={handleChangeSelected}  defaultValue="Selecione"
      options={dataICMS.map((item) => {
        return { label: `${item.estado} - ${item.icms}%`, value: item.icms }
      })}
      />     
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" onClick={calcularIcms}>
        <CalculatorOutlined />Calcular
      </Button>
    </Form.Item>
  </Form>

  {mostrarResultado && 
  <>
  <h1>Resultado: {resultado}</h1>
  <p>Acrécimo de {acrecimo}</p>
  </>
  }

</Modal>
  );

}


export default ModalCalculo;