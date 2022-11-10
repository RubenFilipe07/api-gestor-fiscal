# Gestor fiscal
Este é um projeto baseado numa API REST feita com <a href="https://spring.io/projects/spring-boot">Spring</a>, banco de dados
<a href="https://www.postgresql.org/">PostgreSql</a> e uma aplicação <a href="https://reactjs.org/">React.js</a> que manipula os dados via axios e
utiliza o ant design. Tem como objetivo servir de ferramenta para calcular os impostos sobre os produtos cadastrados.

<h3>Como instalar o projeto</h3>

<ol>
  <li>Clone o repositório com o comando: <code>git clone https://github.com/RubenFilipe07/portfolio</code> </li>
</ol>

<h5>Para rodar o projeto React</h5>
<ol>
  <li>Certifique-se de ter o node.js instalado na sua máquina, caso não tenha, baixe aqui: <a href="https://nodejs.org/en/">nodejs.org</a></li>
  <li>Dentro do projeto digite <code>npm i</code> no terminal para baixar as dependências</li>
  <li>Digite <code>npm start</code> para iniciar o servidor e o acesse pelo link: <code>http://localhost:3000/</code></li>
</ol>

<h5>Para rodar o projeto Spring</h5>
<ol>
  <li>Com um servidor postgresql rodando em sua máquina, veja as configurações de conexão com o banco de dados em  <code>src/main/resources/application.properties</code> para realizar a conexão de acordo com suas credenciais locais</li>
  <li>Crie um banco com o nome proposto no arquivo anterior (altere caso preferir)</li>
  <li>Inicie um servidor local do projeto com <code>/mvnw spring-boot:run</code></li>
  <li>Abra o seguinte link em seu navegador de preferência: <code>http://localhost:8080/</code></li>
</ol>

<h3>Links</h3>
<ul>
    <li><a href="https://gestor-fiscal.web.app/">Aplicação -> gestor-fiscal.web.app</a></li>
    <li><a href="https://gestor-fiscal.herokuapp.com/swagger-ui.html">API -> https://gestor-fiscal.herokuapp.com/swagger-ui.html</a></li>
</ul>

<h3>Demonstração</h3>
<a href="https://gestor-fiscal.herokuapp.com/swagger-ui.html">
  <img width="800" src="https://user-images.githubusercontent.com/53026536/200506717-d0f78b11-46bd-4648-9d7b-32c6c97ddeb3.png"/>
</a>

<a href="https://gestor-fiscal.web.app/">
  <img width="800" src="https://user-images.githubusercontent.com/53026536/201034686-0c3b1891-dc74-4591-b714-4dad8adcf077.png"/>
 </a>
 
<a href="https://gestor-fiscal.web.app/">
  <img width="800" src="https://user-images.githubusercontent.com/53026536/201034702-b8eaf984-e7a7-4ff0-bbc0-193325ca765c.png"/>
</a>

<h3>Ferramentas utilizadas</h3>
<ul>
    <li><a href="https://reactjs.org/">React.js</a></li>
    <li><a href="https://reactrouter.com/en/main">React router</a></li>
    <li><a href="https://ant.design">Ant.design</a></li>
    <li><a href="https://ant.design/docs/spec/icon">Ant.design Icons</a></li>
    <li><a href="https://axios-http.com/docs/intro">Axios</a></li>
    <li><a href="https://spring.io/projects/spring-boot">Spring boot</a></li>
    <li><a href="https://swagger.io">Swagger Ui</a></li>
    <li><a href="https://firebase.google.com/">Firebase</a></li>
    <li><a href="https://heroku.com">Heroku</a></li>
    <li><a href="https://www.postgresql.org/">PostgreSql</a></li>
</ul>

<h3>Licensa</h3>
<a href="https://github.com/RubenFilipe07/spring-react-gestor-fiscal/blob/main/LICENSE">MIT</a>
