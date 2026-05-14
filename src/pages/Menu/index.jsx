import "./style.css";
import { Link, Routes, Route, useLocation } from "react-router-dom";

import {
  FaHome,
  FaBox,
  FaTruck,
  FaWarehouse,
  FaChartBar,
  FaShoppingCart,
  FaCog,
  FaUsers
} from "react-icons/fa";

import Produtos from "../Produtos";
import Fornecedores from "../Fornecedores";
import Compras from "../Compras";
import Vendas from "../Vendas";
import Funcionarios from "../Funcionarios/Funcionarios";

function Menu() {

  const location = useLocation();

  // ===== PEGA TIPO DE USUÁRIO =====
  const tipoUsuario =
    localStorage.getItem("tipoUsuario");

  // ===== MENU PADRÃO =====
  const itensMenu = [
    {
      nome: "Home",
      path: "/menu",
      icon: <FaHome />
    },

    {
      nome: "Produtos",
      path: "/menu/produtos",
      icon: <FaBox />
    },

    {
      nome: "Fornecedores",
      path: "/menu/fornecedores",
      icon: <FaTruck />
    },

    {
      nome: "Compras",
      path: "/menu/compras",
      icon: <FaWarehouse />
    },

    {
      nome: "Vendas",
      path: "/menu/vendas",
      icon: <FaShoppingCart />
    },

    {
      nome: "Relatórios",
      path: "/menu/relatorios",
      icon: <FaChartBar />
    },

    {
      nome: "Configurações",
      path: "/menu/configuracoes",
      icon: <FaCog />
    },
  ];

  // ===== SOMENTE ADMIN =====
  if (tipoUsuario === "admin") {
    itensMenu.push({
      nome: "Funcionários",
      path: "/menu/funcionarios",
      icon: <FaUsers />
    });
  }

  return (
    <div className="container-menu">

      {/* MENU LATERAL */}
      <div className="menu-lateral">

        <h3>Empresa</h3>

        {itensMenu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`item-menu ${
              location.pathname === item.path
                ? "ativo"
                : ""
            }`}
          >
            <span className="icone">
              {item.icon}
            </span>

            {item.nome}
          </Link>
        ))}
      </div>

      {/* CONTEÚDO */}
      <div className="conteudo">

        <Routes>

          <Route
            path="/"
            element={<h1>Home</h1>}
          />

          <Route
            path="produtos"
            element={<Produtos />}
          />

          <Route
            path="fornecedores"
            element={<Fornecedores />}
          />

          <Route
            path="compras"
            element={<Compras />}
          />

          <Route
            path="vendas"
            element={<Vendas />}
          />

          <Route
            path="relatorios"
            element={<h1>Relatórios</h1>}
          />

          <Route
            path="configuracoes"
            element={<h1>Configurações</h1>}
          />

          {/* SOMENTE ADMIN */}
          <Route
            path="funcionarios"
            element={<Funcionarios />}
          />

        </Routes>
      </div>
    </div>
  );
}

export default Menu;