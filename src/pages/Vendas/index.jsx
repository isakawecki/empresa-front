import { useEffect, useState } from "react";
import "./style.css";

export default function Vendas() {
  const [produtos, setProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const carregarDados = () => {
    const p = JSON.parse(localStorage.getItem("produtos")) || [];
    const v = JSON.parse(localStorage.getItem("vendas")) || [];

    setProdutos(p);
    setVendas(v);
  };

  useEffect(() => {
    carregarDados();

    // 🔥 sincroniza
    window.addEventListener("storage", carregarDados);

    return () => window.removeEventListener("storage", carregarDados);
  }, []);

  const vender = () => {
  const produtosLS = JSON.parse(localStorage.getItem("produtos")) || [];

  const produto = produtosLS.find(
    (p) => String(p.id) === String(produtoId)
  );

  const qtd = Number(quantidade);

  if (!produto || qtd <= 0) {
    alert("Preencha corretamente");
    return;
  }

  if (qtd > produto.estoque) {
    alert("Estoque insuficiente");
    return;
  }

  const novaVenda = {
    id: Date.now(),
    nome: produto.nome,
    quantidade: qtd,
    total: produto.preco * qtd,
    data: new Date().toLocaleString(),
  };

  const novosProdutos = produtosLS.map((p) =>
    String(p.id) === String(produtoId)
      ? { ...p, estoque: p.estoque - qtd }
      : p
  );

  const vendasLS = JSON.parse(localStorage.getItem("vendas")) || [];

  localStorage.setItem("produtos", JSON.stringify(novosProdutos));
  localStorage.setItem("vendas", JSON.stringify([...vendasLS, novaVenda]));


  window.dispatchEvent(new Event("produtosAtualizados"));

  carregarDados();

  setProdutoId("");
  setQuantidade("");
};

  return (
    <div className="container">
      <h2>Vendas</h2>

      <div className="form">
        <select value={produtoId} onChange={(e) => setProdutoId(e.target.value)}>
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