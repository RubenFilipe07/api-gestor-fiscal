import { React, Fragment } from "react";
import 'antd/dist/antd.min.css';
import Menu from "../components/Menu/Menu";
import FooterContent from "../components/FooterContent/FooterContent";
import { Link } from "react-router-dom";
import { Card, Layout, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

const contato = () => (
    <Fragment>
        <Layout>
            <Header>
                <Menu />
            </Header>

            <Content className="content">

                <Breadcrumb style={{ margin: '16px'}}>
                    <Breadcrumb.Item><Link to="/">Início</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link to="/contato">Contato</Link></Breadcrumb.Item>
                </Breadcrumb>

                <Card title="Contato do desenvolvedor" bordered={false} style={{ width: 400, margin: '200px auto' }}>
                    <p>Telefone: (84) 981593183</p>
                    <p>Email: <a href="https://mailto:rubenfilipe.net@gmail.com">rubenfilipe.net@gmail.com</a></p>
                    <p>GitHub: <a href="https://github.com/rubenfilipe07">github.com/rubenfilipe07</a></p>
                    <p>Telegram: <a href="https://t.me/ruben_filipe07">t.me/ruben_filipe07</a></p>
                </Card>


            </Content>

            <Footer className="footer">
                <FooterContent />
            </Footer>
        </Layout>
    </Fragment>
);

export default contato;