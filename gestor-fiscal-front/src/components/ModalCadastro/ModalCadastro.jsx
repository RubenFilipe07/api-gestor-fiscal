import React from "react";
import { Form, Input, Button, Modal } from "antd";
import { SaveFilled } from "@ant-design/icons";
import './ModalCadastro.css'


const modalCadastro = (props) => (
  <Modal
  title={props.campoNomeFormulario}
  open={props.open}
  onCancel={props.fechaModal}
  footer={null}
  destroyOnClose={true}
>
  <Form>
    <Form.Item name={`id-${props.tipoItem}`} onChange={props.handleChangeId} required rules={[{ required: true }]} label={`Id do ${props.tipoItem}` }>
      <Input type={"number"} defaultValue={props.idModal} />
    </Form.Item>
    {props.campoNomeFormulario === "Nome do Estado:" ? (
    <Form.Item name="sigla-estado" onChange={props.handleChangeSigla} required rules={[{ required: true }]} label="Sigla">
        <Input  defaultValue={props.siglaModal}/>
    </Form.Item>
    ) : null}
    <Form.Item name={`nome-${props.tipoItem}`} onChange={props.handleChangeName} required rules={[{ required: true }]} label={`Nome do ${props.tipoItem}`}>
      <Input defaultValue={props.nomeModal} />
    </Form.Item>
    {props.tipoItem === 'estado' ? (
      <Form.Item name={`valor-${props.tipoItem}`} onChange={props.handleChangeValue} required rules={[{ required: true }]} label={`ICMS do ${props.tipoItem} (%)`}>
        <Input type={"number"} defaultValue={props.valorModal} />
      </Form.Item> 
    ) : (
      <Form.Item name={`valor-${props.tipoItem}`} onChange={props.handleChangeValue} required rules={[{ required: true }]} label={`Valor do ${props.tipoItem}`}>
      <Input type={"number"} defaultValue={props.valorModal} />
      </Form.Item>
    ) 
  }

    <Form.Item>
      <Button type="primary" htmlType="submit" onClick={props.alteraItem}>
        <SaveFilled />Atualiza Valor
      </Button>
    </Form.Item>
  </Form>
</Modal>


);

export default modalCadastro;