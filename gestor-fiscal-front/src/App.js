import './App.css';
import  { BrowserRouter, Routes, Route }  from  'react-router-dom' ;
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import CadastroProdutos from './pages/CadastroProdutos';
import CadastrarIcms from './pages/CadastrarIcms';
import CalculoIcms from './pages/CalculoIcmsEstadual';

const App = () => (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path='/' exact element={<Home/>}></Route>
      <Route path='/sobre' element={<Sobre/>}></Route>
      <Route path='/contato' element={<Contato/>}></Route>
      <Route path='/cadastro-produtos' element={<CadastroProdutos/>}></Route>
      <Route path='/cadastrar-icms' element={<CadastrarIcms/>}></Route>
      <Route path='/calculo-icms' element={<CalculoIcms/>}></Route>
    </Routes>
  </BrowserRouter>
  );

export default App;
