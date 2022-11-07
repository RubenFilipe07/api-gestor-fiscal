import React from "react";
import './Menu.css';
import { Link } from "react-router-dom";
import { Menu } from "antd";

import {
    HomeOutlined,
    ContactsOutlined,
    InfoCircleOutlined
  } from '@ant-design/icons';
  
  
const menu = () => (
    <div className="Menu">

        <Menu theme="dark" mode="horizontal">
            
            <Menu.Item key="1">
                <HomeOutlined /> 
                <Link className="links-menu" to="/">Inicio</Link>
            </Menu.Item>

            <Menu.Item key="2">
                <InfoCircleOutlined />
                <Link className="links-menu" to="/sobre">Sobre</Link>
            </Menu.Item>

            <Menu.Item key="2">
                <ContactsOutlined />
                <Link className="links-menu" to="/contato">Contato</Link>
            </Menu.Item>
        </Menu>
        
    </div>

);

export default menu;