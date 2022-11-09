import React from "react";
import { Form, Input, Button } from "antd";
import { SaveFilled } from "@ant-design/icons";
import './FormularioCadastro.css'

  
const formulario = (props) => (
     <Form className="form-cadastrar-produto">
              <Form.Item name="nome-produto" onChange={props.handleChangeName} label="Nome do produto">
                <Input />
              </Form.Item>
              <Form.Item name="valor-produto" onChange={props.handleChangeValue} label="Valor">
                <Input type={"number"} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={props.cadastrarProduto}>
                  <SaveFilled />Salvar
                </Button>
              </Form.Item>
            </Form> 

);

export default formulario;