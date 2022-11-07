import './App.css';
import  { BrowserRouter, Routes, Route }  from  'react-router-dom' ;
import Home from './pages/Home';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';

const App = () => (
    <BrowserRouter>
    <Routes>
      <Route path='/' exact element={<Home/>}></Route>
      <Route path='/sobre' element={<Sobre/>}></Route>
      <Route path='/contato' element={<Contato/>}></Route>
    </Routes>
  </BrowserRouter>
  );

export default App;
