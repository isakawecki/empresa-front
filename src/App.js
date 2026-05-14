import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Produtos from "./pages/Produtos";
import Fornecedores from "./pages/Fornecedores";
import Vendas from "./pages/Vendas";

import Funcionarios from "./pages/Funcionarios/Funcionarios";

function App() {

//adm
  const adminExiste = localStorage.getItem("admin");

  if (!adminExiste) {
    const adminPadrao = {
      nome: "Administrador",
      email: "admin@empresa.com",
      senha: "123",
    };

    localStorage.setItem(
      "admin",
      JSON.stringify(adminPadrao)
    );
  }

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* MENU */}
        <Route path="/menu/*" element={<Menu />} />

        {/* PÁGINAS */}
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/fornecedores" element={<Fornecedores />} />
        <Route path="/vendas" element={<Vendas />} />

        {/* FUNCIONÁRIOS */}
        <Route
          path="/funcionarios"
          element={<Funcionarios />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;