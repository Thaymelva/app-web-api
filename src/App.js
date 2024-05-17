import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import NavBar from './components/NavBar/NavBar';
import Container from './components/Container/Container';

import Home from './pages/Home/Home'
import Livros from './pages/Livros/Livros'
import NovoLivro from './pages/NovoLivro/NovoLivro'
import EditarLivro from './pages/EditarLivro';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <Routes>
              <Route path='/' element={<NavBar/>}>

                <Route index element={<Home/>}/>
                <Route path='/livros' element={<Livros/>}/>
                <Route path='/novolivro' element={<NovoLivro/>}/>
                <Route path='/editarlivro/:id' element={<EditarLivro/>}/>

              </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;