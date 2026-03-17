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

function Menu() {
  const location = useLocation();

  const itensMenu = [
    { nome: "Home", path: "/menu", icon: <FaHome /> },
    { nome: "Produtos", path: "/menu/produtos", icon: <FaBox /> },
    { nome: "Fornecedores", path: "/menu/fornecedores", icon: <FaTruck /> },
    { nome: "Estoque", path: "/menu/estoque", icon: <FaWarehouse /> },
    { nome: "Relatórios", path: "/menu/relatorios", icon: <FaChartBar /> },
    { nome: "Vendas", path: "/menu/vendas", icon: <FaShoppingCart /> },
    { nome: "Configurações", path: "/menu/configuracoes", icon: <FaCog /> },
  ];

  return (
    <div className="container-menu">

      {/* MENU */}
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

      {/* CONTEÚDO */}
      <div className="conteudo">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="produtos" element={<h1>Produtos</h1>} />
          <Route path="fornecedores" element={<h1>Fornecedores</h1>} />
          <Route path="estoque" element={<h1>Estoque</h1>} />
          <Route path="relatorios" element={<h1>Relatórios</h1>} />
          <Route path="vendas" element={<h1>Vendas</h1>} />
          <Route path="configuracoes" element={<h1>Configurações</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default Menu;