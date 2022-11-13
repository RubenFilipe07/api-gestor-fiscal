import React, { Fragment, Component } from "react";
import axios from 'axios';
import 'antd/dist/antd.min.css';
import Menu from "../components/Menu/Menu";
import FooterContent from "../components/FooterContent/FooterContent";
import { Layout, Breadcrumb, Table, Button, Space, Skeleton, Alert, Spin, Popconfirm } from "antd";
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
    valor: 0,
    id: 0,
    open: false,
    idModal: 0,
    nomeModal: '',
    valorModal: 0,
    temErro: false,
    mensagemErro: '',
    recebeuDados: false
  }


  componentDidMount() {
    axios.get(`https://gestor-fiscal.herokuapp.com/api/produtos`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
        this.setState({ recebeuDados: true });
      }).catch(error => {
        console.log(error);
        this.setState({ temErro: true });
        this.setState({ recebeuDados: false });
        this.setState({ mensagemErro: 'Não foi possível obter os dados da API' });
      })
  }

  cadastraItem = () => {
    if (this.state.nome === '' || this.state.valor === 0) {
      this.setState({ temErro: true });
      this.setState({ mensagemErro: 'Preencha Todos os Campos' });
    } else {
      axios.post(`https://gestor-fiscal.herokuapp.com/api/produtos`, {
        nome: this.state.nome,
        valor: this.state.valor,
      })
        .then(res => {
          this.atualizaTabela();
          this.setState({ temErro: false });
        })
    }
  }


  atualizaTabela = () => {
    axios.get(`https://gestor-fiscal.herokuapp.com/api/produtos`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
        this.setState({ temErro: false });
        this.setState({ recebeuDados: true });
      }).catch(error => {
        console.log(error);
        this.setState({ temErro: true });
        this.setState({ recebeuDados: false });
      })
  }

  alteraItem = () => {
    if (this.state.id === 0 || this.state.nome === '' || this.state.valor === 0) {
      this.setState({ temErro: true });
      this.setState({ mensagemErro: 'Preencha Todos os Campos' });
    } else {
      axios.put(`https://gestor-fiscal.herokuapp.com/api/produtos`, {
        id: this.state.id,
        nome: this.state.nome,
        valor: this.state.valor
      })
        .then(res => {
          this.fechaModal();
          this.atualizaTabela();
          this.setState({ temErro: false });
        })
    }
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
          <Popconfirm title="Tem certeza?" cancelText="Cancelar" onConfirm={() => this.deletaProduto(record.id)}>
            <Button type="primary" danger >
              <DeleteOutlined />
              Apagar
            </Button>
          </Popconfirm>
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
          {this.state.temErro ? <Alert message={this.state.mensagemErro} type="error" showIcon closable /> : null}
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
              campoNomeFormulario="Cadastro de Produtos:" tipoItem="produto" />


            <TituloCentral titulo="Produtos Cadastrados" />

            {this.state.recebeuDados === false ? (
              <Skeleton active />
            ) : (
              <Table className="tabelaCadastrados" dataSource={this.state.data} rowKey="id" columns={this.columns} pagination={{ pageSize: 7, position: ['bottomCenter'] }} />
            )}

            <TituloCentral titulo="Cadastrar Novo Produto" />
            {this.state.recebeuDados === false? (
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