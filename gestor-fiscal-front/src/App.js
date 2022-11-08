import './App.css';
import  { BrowserRouter, Routes, Route }  from  'react-router-dom' ;
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import CadastroProdutos from './pages/CadastroProdutos';
import CalculoIcmsEstadual from './pages/CalculoIcmsEstadual';
import CalculoIcmsInterestadual from './pages/CalculoIcmsInterestadual';

const App = () => (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path='/' exact element={<Home/>}></Route>
      <Route path='/sobre' element={<Sobre/>}></Route>
      <Route path='/contato' element={<Contato/>}></Route>
      <Route path='/cadastro-produtos' element={<CadastroProdutos/>}></Route>
      <Route path='/calculo-icms-estadual' element={<CalculoIcmsEstadual/>}></Route>
      <Route path='/calculo-icms-interestadual' element={<CalculoIcmsInterestadual/>}></Route>
    </Routes>
  </BrowserRouter>
  );

export default App;
