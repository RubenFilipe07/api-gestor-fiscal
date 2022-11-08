import React, { Fragment, Component } from "react";
import axios from 'axios';
import 'antd/dist/antd.min.css';
import Menu from "../components/Menu/Menu";
import FooterContent from "../components/FooterContent/FooterContent";
import { Layout, Breadcrumb, Table, Form, Input, Button, Space, Modal } from "antd";
import { Link } from "react-router-dom";
import {
  SaveFilled,
  DeleteOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

export default class CadastroProdutos extends Component {

  state = {
    data: [],
    nome: '',
    valor: 0,
    open: false
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

  apagarProduto = () => {
    axios.delete(`http://localhost:8080/api/produtos/`)
      .then(res => {
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

  deleteRow = (id) => {
    axios.delete(`http://localhost:8080/api/produtos/` + id)
      .then(res => {
        this.atualizaTabela();
      }
      )
  };

  editRow = (id) => {
    this.setState({ open: true});
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
      title: 'Action',
      key: 'action',
      render: (record, index) => < div className="btn-wrap"
        key={index} >
        <Button type="primary" danger onClick={() => this.deleteRow(record.id)}>
          <Space size="small" >
            Apagar
            <DeleteOutlined />
          </Space>
        </Button>

        <Button type="primary" onClick={() => this.editRow(record.id)}>
          <Space size="small" >
            Editar
          </Space>
        </Button>
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
              onOk={() => this.setState({ open: false })}
            >
              <p>Bla bla ...</p>
              <p>Bla bla ...</p>
              <p>Bla bla ...</p>
            </Modal>



            <h1>Produtos Cadastrados</h1>
            <Table className="tabelaCadastrados" dataSource={this.state.data} rowKey="id" columns={this.columns} pagination={{ pageSize: 7, position: ['bottomCenter'] }} />;

            <h1>Cadastrar Novo Produto</h1>

            <Form>
              <Form.Item name="name" key={'name'} onChange={this.handleChangeName} label="Nome do produto">
                <Input />
              </Form.Item>
              <Form.Item name="value" key={'value'} onChange={this.handleChangeValue} label="Valor">
                <Input type={"number"} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" onClick={this.cadastrarProduto}>
                  <SaveFilled />Cadastrar
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