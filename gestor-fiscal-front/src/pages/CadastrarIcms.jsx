import React, { Fragment, Component } from "react";
import axios from 'axios';
import 'antd/dist/antd.min.css';
import Menu from "../components/Menu/Menu";
import FooterContent from "../components/FooterContent/FooterContent";
import { Layout, Breadcrumb, Table, Button, Space } from "antd";
import { Link } from "react-router-dom";
import Formulario from "../components/FormularioCadastro/FormularioCadastro";
import ModalCadastro from "../components/ModalCadastro/ModalCadastro";
import TituloCentral from "../components/TituloCentral/TituloCentral";
import {
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
    idModal: 0,
    nomeModal: '',
    valorModal: 0
  }


  componentDidMount() {
    axios.get(`https://gestor-fiscal.herokuapp.com/api/icms`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
  }

  cadastrarProduto = () => {
    axios.post(`https://gestor-fiscal.herokuapp.com/api/icms`, {
      nome: this.state.nome,
      valor: this.state.valor,
    })
      .then(res => {
        this.atualizaTabela();
      })
  }

  atualizaTabela = () => {
    axios.get(`https://gestor-fiscal.herokuapp.com/api/icms`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      }
      )
  }

  alteraProduto = () => {
    axios.put(`https://gestor-fiscal.herokuapp.com/api/icms`, {
      id: this.state.id,
      nome: this.state.nome,
      valor: this.state.valor
    })
      .then(res => {
        this.fechaModal();
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

  deletaProduto = (id) => {
    axios.delete(`https://gestor-fiscal.herokuapp.com/api/icms` + id)
      .then(res => {
        this.atualizaTabela();
      }
      )
  };

  editaLinhaModal = (idRecord, nomeRecord, valorRecord) => {
    this.setState({ open: true });
    this.setState({ idModal: idRecord });
    this.setState({ nomeModal: nomeRecord });
    this.setState({ valorModal: valorRecord });
    this.setState({ id: idRecord });
    this.setState({ nome: nomeRecord });
    this.setState({ valor: valorRecord });
    this.atualizaTabela();
  };

  fechaModal = () => {
    this.setState({ open: false });
  }



  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome do estado',
      dataIndex: 'estado',
      key: 'nome',
    },
    {
      title: 'Sigla',
      dataIndex: 'sigla',
      key: 'valor',
    }, 
    {
        title: 'ICMS (%)',
        dataIndex: 'icms',
        key: 'icms',
    },
    {
      title: 'Ação',
      key: 'acao',
      render: (record, index) => < div className="btn-wrap"
        key={index} >
        <Space size="small" >
          <Button type="primary" danger onClick={() => this.deletaProduto(record.id)}>
            Apagar
            <DeleteOutlined />
          </Button>
          <Button type="primary" onClick={() => this.editaLinhaModal(record.id, record.nome, record.valor)}>
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
              <Breadcrumb.Item><Link to="/cadastro-icms">Cadastro Produtos</Link></Breadcrumb.Item>
            </Breadcrumb>

            <ModalCadastro open={this.state.open} handleChangeId={this.handleChangeId} handleChangeName={this.handleChangeName} 
            handleChangeValue={this.handleChangeValue} idModal={this.state.idModal} nomeModal={this.state.nomeModal}
            valorModal={this.state.valorModal} alteraProduto={this.alteraProduto} fechaModal={this.fechaModal} />

            <TituloCentral titulo="Icms Cadastrados" />
            <Table className="tabelaCadastrados" dataSource={this.state.data} rowKey="id" columns={this.columns} pagination={{ pageSize: 7, position: ['bottomCenter'] }} />;

            <TituloCentral titulo="Cadastrar Novo Icms" />
            <Formulario cadastrarProduto={this.cadastrarProduto} handleChangeName={this.handleChangeName} handleChangeValue={this.handleChangeValue}/>
          </Content>

          <Footer className="footer">
            <FooterContent />
          </Footer>
        </Layout>
      </Fragment>
    );
  }
}