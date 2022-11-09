import React from "react";
import './HomeContent.css';
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "antd";

  
const homeContent = () => (
    <span className="home-content">
           <Row gutter={10} className="row-cards">
                    <Col span={5}>
                        <Card title="Produtos" bordered={false}>
                             <p className="card-text">Cadastre os seus produtos e seus respectivos valores para então calcular os impostos sobre eles.</p>
                            <Button type="primary" size="large" shape="round" block="true">
                                <Link to="/cadastro-produtos">Gerenciar</Link>
                            </Button>
                        </Card>
                    </Col>
                    <Col span={5}>
                        <Card title="Cadastro Icms" bordered={false}>
                             <p className="card-text">Cadastre o valor do ICMS de acordo com as alíquotas de cada estado.</p>       
                            <Button type="primary" size="large" shape="round" block="true">
                                <Link to="/cadastrar-icms">Cadastrar</Link>
                            </Button>
                        </Card>
                    </Col>
                    <Col span={5}>
                        <Card title="Cáculo Estadual" bordered={false}>
                            <p className="card-text">Calcule o valor do ICMS de com os valores dos produtos cadastrados e a alíquota estadual.</p>
                            <Button type="primary" size="large" shape="round" block="true">
                                <Link to="/calculo-icms">Calcular</Link>
                            </Button>
                        </Card>
                    </Col>
                </Row>
    </span>

);

export default homeContent;