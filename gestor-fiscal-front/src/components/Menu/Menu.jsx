import React from "react";
import './Menu.css';
import { Link } from "react-router-dom";
import { Menu } from "antd";
import icon from '../../assets/icon.png';


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
    <div className="menu"> 
        <img className="logo-menu" src={icon} alt="Icone" width={50} height={50}/>
        <h1 className="titulo-menu"><Link to="/">Gestor Fiscal</Link></h1>
        <Menu items={menuItems} mode="horizontal" theme="dark" />
    </div>
);

export default menu;