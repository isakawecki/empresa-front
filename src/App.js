import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Menu from "./pages/Menu";
import Produtos from "./pages/Produtos";
import Fornecedores from "./pages/Fornecedores";
import Vendas from "./pages/Vendas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/menu/*" element={<Menu />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/vendas" element={<Vendas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;