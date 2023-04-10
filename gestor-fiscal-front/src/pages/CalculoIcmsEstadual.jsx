import React, { Fragment, Component } from "react";
import axios from 'axios';
import 'antd/dist/antd.min.css';
import Menu from "../components/Menu/Menu";
import FooterContent from "../components/FooterContent/FooterContent";
import { Layout, Breadcrumb, Table, Button, Skeleton, Alert, Spin } from "antd";
import { Link } from "react-router-dom";
import TituloCentral from "../components/TituloCentral/TituloCentral";
import ModalCalculo from "../components/ModalCalculo/ModalCalculo";

import {
    CalculatorOutlined,
    ReloadOutlined 
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;

export default class CalculoIcmsEstadual extends Component {

  state = {
    data: [],
    dataICMS: [],
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
    axios.get(`https://spring-react-gestor-fiscal-production.up.railway.app/api/produtos`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
      })
      .catch(error => {
        this.setState({ mensagemErro: 'Não foi possível obter os dados da API' });
        this.setState({ temErro: true });
      })
  }

  atualizaTabela = () => {
    axios.get(`https://spring-react-gestor-fiscal-production.up.railway.app/api/produtos`)
      .then(res => {
        const data = res.data;
        this.setState({ data });
        this.setState({ temErro: false });
      }).catch(error => {
        console.log(error);
        this.setState({ temErro: true });
      })
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

  calculaLinha = (idRecord, nomeRecord, valorRecord ) => {
    this.setState({ open: true });
    this.setState({ idModal: idRecord });
    this.setState({ nomeModal: nomeRecord });
    this.setState({ valorModal: valorRecord });
    this.setState({ id: idRecord });
    this.setState({ nome: nomeRecord });
    this.setState({ valor: valorRecord });
    this.atualizaTabela();
    
  }


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
          <Button type="primary" onClick={() => this.calculaLinha(record.id, record.nome, record.valor)}>
          <CalculatorOutlined />
            Calcular ICMS
          </Button>
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
              <Breadcrumb.Item><Link to="/cadastro-produtos">Calculo ICMS estadual</Link></Breadcrumb.Item>
            </Breadcrumb>

   
            <ModalCalculo open={this.state.open} handleChangeId={this.handleChangeId} handleChangeName={this.handleChangeName} 
            handleChangeValue={this.handleChangeValue} idModal={this.state.idModal} nomeModal={this.state.nomeModal}
            valorModal={this.state.valorModal} fechaModal={this.fechaModal} valorSelecionado={this.state.valor}/>

            <TituloCentral titulo="Produtos Cadastrados" />
            {this.state.data.length === 0 ? (
              <>
                 <Skeleton active/>
              </>
              ) : (
                <Table className="tabelaCadastrados" dataSource={this.state.data} rowKey="id" columns={this.columns} pagination={{ pageSize: 7, position: ['bottomCenter'] }} />
              )}

            {this.state.data.length === 0 ? (
              <>
                <Spin tip="Carregando dados da API..." size="large" style={{ fontSize: 24 }} />
                <Button className="btnTentarNovamente" icon={<ReloadOutlined />} onClick={this.atualizaTabela}>Tentar novamente</Button>
              </>
            ) : ( null )}

    
          </Content>

          <Footer className="footer">
            <FooterContent />
          </Footer>
        </Layout>
      </Fragment>
    );
  }
}