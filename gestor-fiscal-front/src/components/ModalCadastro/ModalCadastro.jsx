import React from "react";
import { Form, Input, Button, Modal } from "antd";
import { SaveFilled } from "@ant-design/icons";
import './ModalCadastro.css'


const modalCadastro = (props) => (
  <Modal
  title="Modal"
  open={props.open}
  onCancel={props.fechaModal}
  footer={null}
  destroyOnClose={true}
>
  <Form>
    <Form.Item name="id-produto" onChange={props.handleChangeId} label="Id do produto">
      <Input type={"number"} defaultValue={props.idModal} />
    </Form.Item>
    <Form.Item name="nome-produto" onChange={props.handleChangeName} label="Nome do produto">
      <Input defaultValue={props.nomeModal} />
    </Form.Item>
    <Form.Item name="valor-produto" onChange={props.handleChangeValue} label="Valor">
      <Input type={"number"} defaultValue={props.valorModal} />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" onClick={props.alteraProduto}>
        <SaveFilled />Atualiza Valor
      </Button>
    </Form.Item>
  </Form>
</Modal>


);

export default modalCadastro;