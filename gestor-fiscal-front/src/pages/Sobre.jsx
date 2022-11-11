import React, { Fragment } from "react";
import 'antd/dist/antd.min.css';
import Menu from "../components/Menu/Menu";
import FooterContent from "../components/FooterContent/FooterContent";
import { Link } from "react-router-dom";
import '../components/HomeContent/HomeContent.css';

import { Layout, Breadcrumb, Card, Button, Col, Row, Divider } from "antd";

const { Header, Content, Footer } = Layout;
const Sobre = () => (
    <Fragment>
        <Layout>
            <Header>
                <Menu />
            </Header>

            <Content className="content">

                <Breadcrumb style={{ margin: '16px' }}>
                    <Breadcrumb.Item><Link to="/">Início</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/sobre">Sobre</Link></Breadcrumb.Item>
                </Breadcrumb>

                <Row gutter={10} className="row-cards">
                    <Col span={5}>

                        <Card style={{ width: '300px' }} bordered={false}>
                            <h1>Donwload do Projeto</h1>
                            <p>Este é um projeto open source e está listado no repositório abaixo</p>
                            <Divider />
                            <Button type="primary" style={{ width: '100%' }}>
                                <a className="link" href="https://github.com/RubenFilipe07/spring-react-gestor-fiscal/archive/refs/heads/main.zip">Donwload</a>
                            </Button>
                        </Card>
                    </Col>
                    <Col span={5}>

                        <Card style={{ width: '300px' }} bordered={false}>
                            <h1>Documentação do Projeto</h1>
                            <p>A documentação descreve como o projeto funciona e como ele foi feito</p>
                            <Divider />
                            <Button type="primary" style={{ width: '100%' }}><a href="https://github.com/RubenFilipe07/spring-react-gestor-fiscal/blob/main/README.md">Acessar</a></Button>
                        </Card>
                    </Col>
                </Row>

            </Content>

            <Footer className="footer">
                <FooterContent />
            </Footer>
        </Layout>
    </Fragment>
);

export default Sobre;