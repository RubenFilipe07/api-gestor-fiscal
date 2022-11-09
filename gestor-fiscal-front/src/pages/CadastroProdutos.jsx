import React, { Fragment, Component } from "react";
import axios from 'axios';
import 'antd/dist/antd.min.css';
import Menu from "../components/Menu/Menu";
import FooterContent from "../components/FooterContent/FooterContent";
import { Layout, Breadcrumb, Table, Form, Input, Button, Space, Modal } from "antd";
import { Link } from "react-router-dom";
import {
  SaveFilled,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

export default class CadastroProdutos extends Component {

  state = {
    data: [],
    nome: '',
    valor: 0,
    id: 0,
    open: false,
    idM: 0,
    nomeM: '',
    valorM: 0
  }


  componentDidMount() {
    axios.get(`http://localhost:8080/api/produtos/`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
  }

  cadastrarProduto = () => {
    axios.post(`http://localhost:8080/api/produtos/`, {
      nome: this.state.nome,
      valor: this.state.valor,

    })
      .then(res => {
        this.atualizaTabela();
      })
  }

  atualizaTabela = () => {
    axios.get(`http://localhost:8080/api/produtos/`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      }
      )
  }

  alteraProduto = () => {
    axios.put(`http://localhost:8080/api/produtos/`, {
      id: this.state.id,
      nome: this.state.nome,
      valor: this.state.valor
    })
      .then(res => {
        this.setState({ open: false });
        this.atualizaTabela();
      }
      )
  }



  handleChangeName = (event) => {
    this.setState({
      nome: event.target.value,
    });
  }


  handleChangeValue = (event) => {
    this.setState({
      valor: event.target.value,
    });
  }

  handleChangeId = (event) => {
    this.setState({
      id: event.target.value
    });
  }

  deleteRow = (id) => {
    axios.delete(`http://localhost:8080/api/produtos/` + id)
      .then(res => {
        this.atualizaTabela();
      }
      )
  };

  editRow = (idR, nomeR, valorR) => {
    this.setState({ open: true });
    this.setState({ idM: idR });
    this.setState({ nomeM: nomeR });
    this.setState({ valorM: valorR });
    this.setState({ id: idR });
    this.setState({ nome: nomeR });
    this.setState({ valor: valorR });

    this.atualizaTabela();
  };



  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome do produto',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
    }, {
      title: 'Ação',
      key: 'acao',
      render: (record, index) => < div className="btn-wrap"
        key={index} >
        <Space size="small" >
          <Button type="primary" danger onClick={() => this.deleteRow(record.id)}>
            Apagar
            <DeleteOutlined />
          </Button>
          <Button type="primary" onClick={() => this.editRow(record.id, record.nome, record.valor)}>
            <EditOutlined />
            Editar
          </Button>
        </Space>
      </div >

    }

  ];


  render() {
    return (
      <Fragment>
        <Layout>
          <Header>
            <Menu />
          </Header>

          <Content className="content">
            <Breadcrumb style={{ margin: '16px' }}>
              <Breadcrumb.Item><Link to="/">Início</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/cadastro-produtos">Cadastro Produtos</Link></Breadcrumb.Item>
            </Breadcrumb>

            <Modal
              title="Modal"
              open={this.state.open}
              onCancel={() => this.setState({ open: false })}
              onOk={() => this.alteraProduto}
              footer={null}
              destroyOnClose={true}
            >
              <Form>
                <Form.Item name="id-produto" onChange={this.handleChangeId} label="Id do produto">
                  <Input type={"number"} defaultValue={this.state.idM} />
                </Form.Item>
                <Form.Item name="nome-produto" onChange={this.handleChangeName} label="Nome do produto">
                  <Input defaultValue={this.state.nomeM} />
                </Form.Item>
                <Form.Item name="valor-produto" onChange={this.handleChangeValue} label="Valor">
                  <Input type={"number"} defaultValue={this.state.valorM} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" onClick={this.alteraProduto}>
                    <SaveFilled />Atualiza Valor
                  </Button>
                </Form.Item>
              </Form>
            </Modal>



            <h1 className="titulo-bloco">Produtos Cadastrados</h1>
            <Table className="tabelaCadastrados" dataSource={this.state.data} rowKey="id" columns={this.columns} pagination={{ pageSize: 7, position: ['bottomCenter'] }} />;

            <h1 className="titulo-bloco">Cadastrar Novo Produto</h1>

            <Form className="form-cadastrar-produto">
              <Form.Item name="nome-produto" onChange={this.handleChangeName} label="Nome do produto">
                <Input />
              </Form.Item>
              <Form.Item name="valor-produto" onChange={this.handleChangeValue} label="Valor">
                <Input type={"number"} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={this.cadastrarProduto}>
                  <SaveFilled />Salvar
                </Button>
              </Form.Item>
            </Form>



          </Content>

          <Footer className="footer">
            <FooterContent />
          </Footer>
        </Layout>
      </Fragment>
    );
  }
}