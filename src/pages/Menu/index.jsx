import "./style.css";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaTruck,
  FaWarehouse,
  FaChartBar,
  FaShoppingCart,
  FaCog
} from "react-icons/fa";
import Produtos from "../Produtos";
import Fornecedores from "../Fornecedores";
import Compras from "../Compras";
import Vendas from "../Vendas";

function Menu() {
  const location = useLocation();

  const itensMenu = [
    { nome: "Home", path: "/menu", icon: <FaHome /> },
    { nome: "Produtos", path: "/menu/produtos", icon: <FaBox /> },
    { nome: "Fornecedores", path: "/menu/fornecedores", icon: <FaTruck /> },
    { nome: "Compras", path: "/menu/compras", icon: <FaWarehouse /> },
    { nome: "Vendas", path: "/menu/vendas", icon: <FaShoppingCart /> },
    { nome: "Relatórios", path: "/menu/relatorios", icon: <FaChartBar /> },
    { nome: "Configurações", path: "/menu/configuracoes", icon: <FaCog /> },
  ];

  return (
    <div className="container-menu">

      <div className="menu-lateral">
        <h3>Empresa</h3>

        {itensMenu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`item-menu ${
              location.pathname === item.path ? "ativo" : ""
            }`}
          >
            <span className="icone">{item.icon}</span>
            {item.nome}
          </Link>
        ))}
      </div>

      <div className="conteudo">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="produtos" element={<Produtos />} /> 
          <Route path="fornecedores" element={<Fornecedores />} />
          <Route path="relatorios" element={<h1>Relatórios</h1>} />
          <Route path="compras" element={<Compras />} />
          <Route path="vendas" element={<Vendas />} />
          <Route path="configuracoes" element={<h1>Configurações</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default Menu;