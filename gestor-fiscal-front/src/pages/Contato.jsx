import React, { Fragment } from "react";
import 'antd/dist/antd.min.css';
import Menu from "../components/Menu/Menu";
import FooterContent from "../components/FooterContent/FooterContent";

import { Layout } from "antd";

const { Header, Content, Footer } = Layout;
const Contato = () => (
    <Fragment>
        <Layout>
            <Header>
                <Menu />
            </Header>

            <Content className="content">
            
            </Content>
            
            <Footer className="footer">
                <FooterContent/>
            </Footer>
        </Layout>
    </Fragment>
);

export default Contato;