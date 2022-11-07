import React from "react";
import 'antd/dist/antd.min.css';
import Menu from "../components/Menu/Menu";
import FooterContent from "../components/FooterContent/FooterContent";

import { Layout } from "antd";

const { Header, Content, Footer } = Layout;
const Sobre = () => (
    <div className="Sobre">
        <Layout>
            <Header>
                <Menu />
            </Header>
            <Content>
            </Content>
            <Footer>
                <FooterContent/>
            </Footer>
        </Layout>
    </div>

);

export default Sobre;