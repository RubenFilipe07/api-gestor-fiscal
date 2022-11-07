import React from "react";
import './Menu.css';
import { Link } from "react-router-dom";
import { Menu } from "antd";

import {
    HomeOutlined,
    ContactsOutlined,
    InfoCircleOutlined
  } from '@ant-design/icons';
  
  const menuItems = [
    {
        key: 'Inicio',
        icon: <HomeOutlined />,
        label: (<Link to="/">Inicio</Link>),
    },
    {
        key: 'Contato',
        icon: <ContactsOutlined />,
        label: (<Link to="/contato">Contato</Link>),
    },
    {
        key: 'Sobre',
        icon: <InfoCircleOutlined />,
        label: (<Link to="/sobre">Sobre</Link>),
    },
];

const menu = () => (
    <div className="Menu">
        <Menu items={menuItems} mode="horizontal"  />
    </div>

);

export default menu;