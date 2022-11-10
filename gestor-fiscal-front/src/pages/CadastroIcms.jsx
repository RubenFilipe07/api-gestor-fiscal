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

export default class CadastroIcms extends Component {

  state = {
    data: [],
    estado: '',
    icms: 0,
    sigla: '',
    id: 0,
    open: false,
    idModal: 0,
    nomeModal: '',
    siglaModal: '',
    valorModal: 0
  }


  componentDidMount() {
    axios.get(`https://gestor-fiscal.herokuapp.com/api/icms`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
      .catch(error => {
        this.setState({ temErro: true });
        this.setState({ mensagemErro: 'Não foi possível obter os dados da API' });
      })
  }

  cadastraItem = () => {
    if (this.state.estado === '' || this.state.sigla === 0 || this.state.icms === '') {
      this.setState({ temErro: true });
      this.setState({ mensagemErro: 'Preencha Todos os Campos' });
    } else {
      axios.post(`https://gestor-fiscal.herokuapp.com/api/icms`, {
        estado: this.state.estado,
        sigla: this.state.sigla,
        icms: this.state.icms,
      })
        .then(res => {
          this.atualizaTabela();
        })
    }
  }
  atualizaTabela = () => {
    axios.get(`https://gestor-fiscal.herokuapp.com/api/icms`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
        this.setState({ temErro: false });
      }
      ).catch(error => {
        console.log(error);
        this.setState({ temErro: true });
      })
  }

  alteraItem = () => {
    axios.put(`https://gestor-fiscal.herokuapp.com/api/icms`, {
      id: this.state.id,
      sigla: this.state.sigla,
      estado: this.state.estado,
      icms: this.state.icms
    })
      .then(res => {
        this.fechaModal();
        this.atualizaTabela();
      }
      )
  }

  handleChangeName = (event) => {
    this.setState({
      estado: event.target.value,
    });
  }


  handleChangeValue = (event) => {
    this.setState({
      icms: event.target.value,
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

  deletaIcms = (id) => {
    axios.delete(`https://gestor-fiscal.herokuapp.com/api/icms/` + id)
      .then(res => {
        this.atualizaTabela();
      }
      )
  };

  editaLinhaModal = (idRecord, estadoRecord, siglaRecord, valorRecord) => {
    this.setState({ open: true });
    this.setState({ idModal: idRecord });
    this.setState({ nomeModal: estadoRecord });
    this.setState({ valorModal: valorRecord });
    this.setState({ siglaModal: siglaRecord });
    this.setState({ id: idRecord });
    this.setState({ sigla: siglaRecord });
    this.setState({ estado: estadoRecord });
    this.setState({ icms: valorRecord });
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
      key: 'estado',
    },
    {
      title: 'Sigla',
      dataIndex: 'sigla',
      key: 'sigla',
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
          <Popconfirm title="Tem certeza?" cancelText="Cancelar" onConfirm={() => this.deletaIcms(record.id)}>
            <Button type="primary" danger >
              <DeleteOutlined />
              Apagar
            </Button>
          </Popconfirm>

          <Button type="primary" onClick={() => this.editaLinhaModal(record.id, record.estado, record.sigla, record.icms)}>
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
              <Breadcrumb.Item><Link to="/cadastro-icms">Cadastro Icms</Link></Breadcrumb.Item>
            </Breadcrumb>

            <ModalCadastro open={this.state.open} handleChangeId={this.handleChangeId} handleChangeName={this.handleChangeName}
              handleChangeValue={this.handleChangeValue} idModal={this.state.idModal} siglaModal={this.state.siglaModal} nomeModal={this.state.nomeModal}
              valorModal={this.state.valorModal} alteraItem={this.alteraItem} fechaModal={this.fechaModal} handleChangeSigla={this.handleChangeSigla}
              campoNomeFormulario="Nome do Estado:" tipoItem="estado" />

            <TituloCentral titulo="Icms Cadastrados" />

            {this.state.data.length === 0 ? (
              <Skeleton active />
            ) : (
              <Table className="tabelaCadastrados" dataSource={this.state.data} rowKey="id" columns={this.columns} pagination={{ pageSize: 7, position: ['bottomCenter'] }} />
            )}

            <TituloCentral titulo="Cadastrar Novo Icms" />
            {this.state.data.length === 0 ? (
              <>
                <Spin tip="Carregando dados da API..." size="large" style={{ fontSize: 24 }} />
                <Button className="btnTentarNovamente" icon={<ReloadOutlined />} onClick={this.atualizaTabela}>Tentar novamente</Button>
              </>
            ) : (
              <Formulario cadastraItem={this.cadastraItem} handleChangeName={this.handleChangeName} handleChangeSigla={this.handleChangeSigla} handleChangeValue={this.handleChangeValue} campoNomeFormulario="Nome do Estado:" />
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