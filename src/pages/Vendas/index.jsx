import { useEffect, useState } from "react";
import "./style.css";

export default function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);

  const [produtoId, setProdutoId] = useState("");

  const [quantidade, setQuantidade] = useState("");

  // ===== CARREGAR DADOS =====
  const carregarDados = () => {
    const p = JSON.parse(localStorage.getItem("produtos")) || [];

    const v = JSON.parse(localStorage.getItem("vendas")) || [];

    setProdutos(p);

    setVendas(v);
  };

  // ===== USE EFFECT =====
  useEffect(() => {
    carregarDados();

    window.addEventListener("storage", carregarDados);

    return () => window.removeEventListener("storage", carregarDados);
  }, []);

  // ===== VENDER =====
  const vender = () => {
    const produtosLS = JSON.parse(localStorage.getItem("produtos")) || [];

    const produto = produtosLS.find((p) => String(p.id) === String(produtoId));

    const qtd = Number(quantidade);

    // ===== VALIDAÇÃO =====
    if (!produto || qtd <= 0) {
      alert("Preencha corretamente");

      return;
    }

    // ===== ESTOQUE =====
    if (qtd > produto.estoque) {
      alert("Estoque insuficiente");

      return;
    }

    // ===== TOTAL =====
    const totalVenda = Number(produto.preco) * qtd;

    // ===== NOVA VENDA =====
    const novaVenda = {
      id: Date.now(),

      nome: produto.nome,

      quantidade: qtd,

      total: totalVenda,

      data: new Date().toLocaleString(),
    };

    // ===== DIMINUI ESTOQUE =====
    const novosProdutos = produtosLS.map((p) =>
      String(p.id) === String(produtoId)
        ? {
            ...p,

            estoque: Number(p.estoque) - qtd,
          }
        : p,
    );

    // ===== SALVA VENDA =====
    const vendasLS = JSON.parse(localStorage.getItem("vendas")) || [];

    localStorage.setItem("produtos", JSON.stringify(novosProdutos));

    localStorage.setItem("vendas", JSON.stringify([...vendasLS, novaVenda]));

    // ===== FUNCIONÁRIO LOGADO =====
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || [];

    // ===== ATUALIZA ESTATÍSTICAS =====
    const novaListaFuncionarios = funcionarios.map((funcionario) => {
      if (funcionario.email === usuarioLogado) {
        return {
          ...funcionario,

          vendas: (funcionario.vendas || 0) + qtd,

          faturamento: (funcionario.faturamento || 0) + totalVenda,
        };
      }

      return funcionario;
    });

    localStorage.setItem("funcionarios", JSON.stringify(novaListaFuncionarios));

    window.dispatchEvent(new Event("funcionariosAtualizados"));
    // ===== SINCRONIZA =====
    window.dispatchEvent(new Event("produtosAtualizados"));

    carregarDados();

    setProdutoId("");

    setQuantidade("");

    alert("Venda realizada!");
  };

  return (
    <div className="container">
      <h2>Vendas</h2>

      {/* FORM */}
      <div className="form">
        <select
          value={produtoId}
          onChange={(e) => setProdutoId(e.target.value)}
        >
          <option value="">Selecione</option>

          {produtos.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nome} (Estoque: {p.estoque})
            </option>
          ))}
        </select>

        <input
          type="number"
          value={quantidade}
          placeholder="Quantidade"
          onChange={(e) => setQuantidade(e.target.value)}
        />

        <button onClick={vender}>Vender</button>
      </div>

      {/* TABELA */}
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Qtd</th>
            <th>Total</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {vendas.map((v) => (
            <tr key={v.id}>
              <td>{v.nome}</td>

              <td>{v.quantidade}</td>

              <td>R$ {v.total}</td>

              <td>{v.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
