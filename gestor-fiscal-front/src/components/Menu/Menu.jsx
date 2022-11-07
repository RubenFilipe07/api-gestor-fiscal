import React from "react";
import 'antd/dist/antd.min.css';
import './Menu.css';
import { Layout, Menu } from "antd";

import {
    HomeOutlined,
    ContactsOutlined,
    InfoCircleOutlined
  } from '@ant-design/icons';
  
  

const { Header, Content, Footer } = Layout;
const menu = () => (
    <div className="Menu">
       <Layout>
        <Header>
        <Menu theme="dark" mode="horizontal">
            
            <Menu.Item key="1">
                <HomeOutlined /> 
                <a className="links-menu" href="/">Inicio</a>
            </Menu.Item>

            <Menu.Item key="2">
                <InfoCircleOutlined />
                <a className="links-menu" href="/">Sobre</a>
            </Menu.Item>

            <Menu.Item key="2">
                <ContactsOutlined />
                <a className="links-menu" href="/">Contato</a>
            </Menu.Item>
        </Menu>
        
        </Header>
        <Content>
        </Content>
        <Footer>
            <span className="texto-footer">
                &copy; Rúben Filipe 2022. Feito com react.js e ant.design
            </span>
            
        </Footer>

       </Layout>
    </div>

);

export default menu;