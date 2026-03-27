import { useState, useEffect } from "react";
import "./style.css";

const salvarLocal = (chave, dados) => {
  localStorage.setItem(chave, JSON.stringify(dados));
};

const pegarLocal = (chave) => {
  return JSON.parse(localStorage.getItem(chave)) || [];
};

export default function Compras() {
  const usuarioLogado = localStorage.getItem("usuario") || "Isa";

  const [fornecedores, setFornecedores] = useState(pegarLocal("fornecedores"));
  const [produtos, setProdutos] = useState(pegarLocal("produtos"));
  const [compras, setCompras] = useState(pegarLocal("compras"));

  const [modalCompra, setModalCompra] = useState(false);
  const [modalFornecedor, setModalFornecedor] = useState(false);
  const [modalProduto, setModalProduto] = useState(false);

  const [compraSelecionada, setCompraSelecionada] = useState(null);

  const [formCompra, setFormCompra] = useState({
    data: "",
    fornecedor: "",
    itens: [],
  });

  const [itemAtual, setItemAtual] = useState({
    produto: "",
    quantidade: 1,
  });

  const [novoFornecedor, setNovoFornecedor] = useState({
    nome_empresa: "",
    cnpj: "",
    telefone: "",
  });

  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    foto: "",
  });

  // 🔥 SINCRONIZA COM OUTRAS TELAS
  useEffect(() => {
    const atualizar = () => {
      setProdutos(pegarLocal("produtos"));
      setFornecedores(pegarLocal("fornecedores"));
    };

    window.addEventListener("produtosAtualizados", atualizar);

    return () => {
      window.removeEventListener("produtosAtualizados", atualizar);
    };
  }, []);

  // ========================
  // FORNECEDOR
  // ========================
  const adicionarFornecedor = () => {
    if (!novoFornecedor.nome_empresa) return;

    const novo = { ...novoFornecedor, id: Date.now() };
    const novos = [...fornecedores, novo];

    setFornecedores(novos);
    salvarLocal("fornecedores", novos);

    setFormCompra((prev) => ({
      ...prev,
      fornecedor: novo.nome_empresa,
    }));

    setNovoFornecedor({ nome_empresa: "", cnpj: "", telefone: "" });
    setModalFornecedor(false);
  };

  // ========================
  // PRODUTO
  // ========================
  const adicionarProduto = () => {
    if (!novoProduto.nome) return;

    const novo = {
      ...novoProduto,
      id: Date.now(),
      preco: Number(novoProduto.preco),
      estoque: Number(novoProduto.estoque),
    };

    const novos = [...produtos, novo];

    setProdutos(novos);
    salvarLocal("produtos", novos);

    window.dispatchEvent(new Event("produtosAtualizados"));

    setItemAtual((prev) => ({
      ...prev,
      produto: novo.nome,
    }));

    setNovoProduto({
      nome: "",
      descricao: "",
      preco: "",
      estoque: "",
      foto: "",
    });

    setModalProduto(false);
  };

  // ========================
  // ITEM
  // ========================
  const adicionarItem = () => {
    const produto = produtos.find((p) => p.nome === itemAtual.produto);
    if (!produto) return;

    const total = Number(produto.preco) * Number(itemAtual.quantidade);

    setFormCompra((prev) => ({
      ...prev,
      itens: [...prev.itens, { ...itemAtual, total }],
    }));

    setItemAtual({ produto: "", quantidade: 1 });
  };

  const totalCompra = () => {
    return formCompra.itens.reduce((acc, i) => acc + i.total, 0);
  };


  // SALVAR COMPRA
 
  const salvarCompra = () => {
    if (!formCompra.data || !formCompra.fornecedor || formCompra.itens.length === 0) {
      alert("Preencha tudo");
      return;
    }

    const nova = {
      ...formCompra,
      total: totalCompra(),
      funcionario: usuarioLogado,
      id: Date.now(),
    };

    const novasCompras = [...compras, nova];

    // 🔥 ATUALIZA ESTOQUE
    let produtosAtualizados = [...produtos];

    formCompra.itens.forEach((item) => {
      produtosAtualizados = produtosAtualizados.map((p) => {
        if (p.nome === item.produto) {
          return {
            ...p,
            estoque: Number(p.estoque) + Number(item.quantidade),
          };
        }
        return p;
      });
    });

    setCompras(novasCompras);
    salvarLocal("compras", novasCompras);

    setProdutos(produtosAtualizados);
    salvarLocal("produtos", produtosAtualizados);

    window.dispatchEvent(new Event("produtosAtualizados"));

    setFormCompra({ data: "", fornecedor: "", itens: [] });
    setModalCompra(false);
  };

  return (
    <div className="container-produtos">

      {/* LISTA */}
      <div className="lista">
        <div className="topo">
          <h2>Compras</h2>
          <button onClick={() => setModalCompra(true)}>+ Nova Compra</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Fornecedor</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {compras.map((c) => (
              <tr key={c.id} onClick={() => setCompraSelecionada(c)}>
                <td>{c.data}</td>
                <td>{c.fornecedor}</td>
                <td>R$ {c.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETALHE */}
      {compraSelecionada && (
        <div className="detalhe">
          <h3>Detalhe da Compra</h3>

          <p><b>Data:</b> {compraSelecionada.data}</p>
          <p><b>Fornecedor:</b> {compraSelecionada.fornecedor}</p>
          <p><b>Funcionário:</b> {compraSelecionada.funcionario}</p>

          <h4>Itens:</h4>
          {compraSelecionada.itens.map((i, index) => (
            <p key={index}>
              {i.produto} - {i.quantidade}
            </p>
          ))}

          <button onClick={() => setCompraSelecionada(null)}>Fechar</button>
        </div>
      )}

      {/* MODAL COMPRA */}
      {modalCompra && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Nova Compra</h3>

            <input
              type="date"
              value={formCompra.data}
              onChange={(e) =>
                setFormCompra({ ...formCompra, data: e.target.value })
              }
            />

            {/* FORNECEDOR */}
            <div>
              <select
                value={formCompra.fornecedor}
                onChange={(e) =>
                  setFormCompra({ ...formCompra, fornecedor: e.target.value })
                }
              >
                <option value="">Fornecedor</option>
                {fornecedores.map((f) => (
                  <option key={f.id}>{f.nome_empresa}</option>
                ))}
              </select>
              <button onClick={() => setModalFornecedor(true)}>+</button>
            </div>

            {/* PRODUTO */}
            <div>
              <select
                value={itemAtual.produto}
                onChange={(e) =>
                  setItemAtual({ ...itemAtual, produto: e.target.value })
                }
              >
                <option value="">Produto</option>
                {produtos.map((p) => (
                  <option key={p.id}>{p.nome}</option>
                ))}
              </select>
              <button onClick={() => setModalProduto(true)}>+</button>
            </div>

            <input
              type="number"
              value={itemAtual.quantidade}
              onChange={(e) =>
                setItemAtual({
                  ...itemAtual,
                  quantidade: Number(e.target.value),
                })
              }
            />

            <button onClick={adicionarItem}>Adicionar Item</button>

            <ul>
              {formCompra.itens.map((i, index) => (
                <li key={index}>
                  {i.produto} - {i.quantidade}
                </li>
              ))}
            </ul>

            <h4>Total: R$ {totalCompra()}</h4>

            <div className="acoes">
              <button onClick={salvarCompra}>Salvar</button>
              <button onClick={() => setModalCompra(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FORNECEDOR */}
      {modalFornecedor && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Novo Fornecedor</h3>

            <input placeholder="Empresa"
              onChange={(e) =>
                setNovoFornecedor({ ...novoFornecedor, nome_empresa: e.target.value })
              }
            />
            <input placeholder="CNPJ"
              onChange={(e) =>
                setNovoFornecedor({ ...novoFornecedor, cnpj: e.target.value })
              }
            />
            <input placeholder="Telefone"
              onChange={(e) =>
                setNovoFornecedor({ ...novoFornecedor, telefone: e.target.value })
              }
            />

            <div className="acoes">
              <button onClick={adicionarFornecedor}>Salvar</button>
              <button onClick={() => setModalFornecedor(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PRODUTO */}
      {modalProduto && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Novo Produto</h3>

            <input placeholder="Nome"
              onChange={(e) =>
                setNovoProduto({ ...novoProduto, nome: e.target.value })
              }
            />
            <input placeholder="Descrição"
              onChange={(e) =>
                setNovoProduto({ ...novoProduto, descricao: e.target.value })
              }
            />
            <input placeholder="Preço" type="number"
              onChange={(e) =>
                setNovoProduto({ ...novoProduto, preco: Number(e.target.value) })
              }
            />
            <input placeholder="Estoque" type="number"
              onChange={(e) =>
                setNovoProduto({ ...novoProduto, estoque: Number(e.target.value) })
              }
            />
            <input placeholder="Imagem URL"
              onChange={(e) =>
                setNovoProduto({ ...novoProduto, foto: e.target.value })
              }
            />

            <div className="acoes">
              <button onClick={adicionarProduto}>Salvar</button>
              <button onClick={() => setModalProduto(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}