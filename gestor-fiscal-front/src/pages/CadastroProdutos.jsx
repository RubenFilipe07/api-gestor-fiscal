import React, { Fragment, Component } from "react";
import axios from 'axios';
import 'antd/dist/antd.min.css';
import Menu from "../components/Menu/Menu";
import FooterContent from "../components/FooterContent/FooterContent";
import { Layout, Breadcrumb, Table, Button, Space, Skeleton, Alert, Spin } from "antd";
import { Link } from "react-router-dom";
import Formulario from "../components/FormularioCadastro/FormularioCadastro";
import ModalCadastro from "../components/ModalCadastro/ModalCadastro";
import TituloCentral from "../components/TituloCentral/TituloCentral";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

export default class CadastroProdutos extends Component {

  state = {
    data: [],
    nome: '',
    sigla: '',
    valor: 0,
    id: 0,
    open: false,
    idModal: 0,
    siglaModal: '',
    nomeModal: '',
    valorModal: 0,
    temErro: false,
  }


  componentDidMount() {
    axios.get(`https://gestor-fiscal.herokuapp.com/api/produtos`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      }).catch(error => {
        console.log(error);
        this.setState({ temErro: true });
      })
  }

  cadastraItem = () => {
    axios.post(`https://gestor-fiscal.herokuapp.com/api/produtos`, {
      nome: this.state.nome,
      sigla: this.state.sigla,
      valor: this.state.valor,
    })
      .then(res => {
        this.atualizaTabela();
      })
  }

  atualizaTabela = () => {
    axios.get(`https://gestor-fiscal.herokuapp.com/api/produtos`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
        this.setState({ temErro: false });
      }).catch(error => {
        console.log(error);
        this.setState({ temErro: true });
      })
  }

  alteraItem = () => {
    axios.put(`https://gestor-fiscal.herokuapp.com/api/produtos`, {
      id: this.state.id,
      nome: this.state.nome,
      sigla: this.state.sigla,
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

  handleChangeSigla = (event) => {
    this.setState({
      sigla: event.target.value
    });
  }

  deletaProduto = (id) => {
    axios.delete(`https://gestor-fiscal.herokuapp.com/api/produtos/` + id)
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
          {this.state.temErro ? <Alert message="Não foi possível obter os dados da API" type="error" showIcon closable /> : null}
          <Header>
            <Menu />
          </Header>

          <Content className="content">
            <Breadcrumb style={{ margin: '16px' }}>
              <Breadcrumb.Item><Link to="/">Início</Link></Breadcrumb.Item>
              <Breadcrumb.Item><Link to="/cadastro-produtos">Cadastro Produtos</Link></Breadcrumb.Item>
            </Breadcrumb>


            <ModalCadastro open={this.state.open} handleChangeId={this.handleChangeId} handleChangeName={this.handleChangeName}
              handleChangeValue={this.handleChangeValue} idModal={this.state.idModal} nomeModal={this.state.nomeModal}
              valorModal={this.state.valorModal} alteraItem={this.alteraItem} fechaModal={this.fechaModal}
              campoNomeFormulario="Cadastro de Produtos:" tipoItem="produto"/>


            <TituloCentral titulo="Produtos Cadastrados" />

            {this.state.data.length === 0 ? (
              <Skeleton active />
            ) : (
              <Table className="tabelaCadastrados" dataSource={this.state.data} rowKey="id" columns={this.columns} pagination={{ pageSize: 7, position: ['bottomCenter'] }} />
            )}

            <TituloCentral titulo="Cadastrar Novo Produto" />
            {this.state.data.length === 0 ? (
              <>
                <Spin tip="Carregando dados da API..." size="large" style={{ fontSize: 24 }} />
                <Button className="btnTentarNovamente" icon={<ReloadOutlined />} onClick={this.atualizaTabela}>Tentar novamente</Button>
              </>
            ) : (
              <Formulario cadastraItem={this.cadastraItem} handleChangeName={this.handleChangeName} handleChangeValue={this.handleChangeValue} campoNomeFormulario="Nome do produto:" />
            )}


          </Content>

          <Footer className="footer">
            <FooterContent />
          </Footer>
        </Layout>
      </Fragment>
    );
  }
}