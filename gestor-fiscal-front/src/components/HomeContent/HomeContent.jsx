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
                                <Link to="/contato">Gerenciar</Link>
                            </Button>
                        </Card>
                    </Col>
                    <Col span={5}>
                        <Card title="Icms estadual" bordered={false}>
                             <p className="card-text">Calcule o valor do ICMS de com a aliquota de operação do estado de origem.</p>       
                            <Button type="primary" size="large" shape="round" block="true">
                                <Link to="/contato">Calcular</Link>
                            </Button>
                        </Card>
                    </Col>
                    <Col span={5}>
                        <Card title="Icms interestadual" bordered={false}>
                            <p className="card-text">Calcule o valor do ICMS de com a aliquota de operação entre estado de origem e destino.</p>
                            <Button type="primary" size="large" shape="round" block="true">
                                <Link to="/contato">Calcular</Link>
                            </Button>
                        </Card>
                    </Col>
                </Row>
    </span>

);

export default homeContent;