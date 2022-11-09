import React, { Fragment } from "react";
import './TituloCentral.css';

  
const titulo = (props) => (
    <Fragment>
        <h1 className="titulo-central">{props.titulo}</h1>
    </Fragment>
);

export default titulo;