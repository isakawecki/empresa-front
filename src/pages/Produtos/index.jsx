import { useState } from "react";
import "./style.css";

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nome: "",
    descricao: "",
    preco: "",
    estoque: "",
    foto: "",
  });
  const [selecionado, setSelecionado] = useState(null);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [tipoRemocao, setTipoRemocao] = useState("tudo");
  const [qtdRemover, setQtdRemover] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const adicionarProduto = () => {
    const novo = { ...form, id: Date.now() };
    setProdutos([...produtos, novo]);
    limparForm();
    setModalAdd(false);
  };

  const abrirEditar = () => {
    setForm(selecionado);
    setModalEdit(true);
  };

  const salvarEdicao = () => {
    setProdutos(produtos.map((p) => (p.id === form.id ? form : p)));
    setSelecionado(form);
    limparForm();
    setModalEdit(false);
  };

  const confirmarDelete = () => {
    if (tipoRemocao === "tudo") {
      setProdutos(produtos.filter((p) => p.id !== selecionado.id));
      setSelecionado(null);
    } else {
      setProdutos(
        produtos.map((p) => {
          if (p.id === selecionado.id) {
            return { ...p, estoque: Math.max(0, p.estoque - qtdRemover) };
          }
          return p;
        }),
      );
    }
    setModalDelete(false);
  };

  const limparForm = () => {
    setForm({
      id: null,
      nome: "",
      descricao: "",
      preco: "",
      estoque: "",
      foto: "",
    });
  };

  return (
    <div className="container-produtos">
      {/* LISTA */}
      <div className="lista">
        <div className="topo">
          <h2>Produtos</h2>
          <button onClick={() => setModalAdd(true)}>+ Adicionar</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Estoque</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id} onClick={() => setSelecionado(p)}>
                <td>
                  <img src={p.foto} alt="" />
                </td>
                <td className="nome-produto">{p.nome}</td>
                <td className="descricao-produto">{p.descricao}</td>
                <td>{p.estoque}</td>
                <td>R$ {p.preco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
      {selecionado && (
        <div className="detalhe">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Produto</h3>
            <button className="chis" onClick={() => setSelecionado(null)}>
              X
            </button>
          </div>

          <img src={selecionado.foto} alt="" />

          <p>
            <b>Nome:</b> {selecionado.nome}
          </p>
          <p>
            <b>Descrição:</b> {selecionado.descricao}
          </p>
          <p>
            <b>Preço:</b> R$ {selecionado.preco}
          </p>
          <p>
            <b>Estoque:</b> {selecionado.estoque}
          </p>

          <button onClick={abrirEditar}>Editar</button>
          <button onClick={() => setModalDelete(true)}>Remover</button>
        </div>
      )}


      {modalDelete && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Remover produto</h3>

            <label>
              <input
                type="radio"
                checked={tipoRemocao === "tudo"}
                onChange={() => setTipoRemocao("tudo")}
              />{" "}
              Remover tudo
            </label>

            <label>
              <input
                type="radio"
                checked={tipoRemocao === "quantidade"}
                onChange={() => setTipoRemocao("quantidade")}
              />{" "}
              Remover quantidade
            </label>

            {tipoRemocao === "quantidade" && (
              <input
                type="number"
                placeholder="Quantidade"
                value={qtdRemover}
                onChange={(e) => setQtdRemover(Number(e.target.value))}
              />
            )}

            <div className="acoes">
              <button onClick={confirmarDelete}>Confirmar</button>
              <button onClick={() => setModalDelete(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}


      {modalAdd && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Adicionar produto</h3>

            <input
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
            />
            <input
              name="descricao"
              placeholder="Descrição"
              value={form.descricao}
              onChange={handleChange}
            />
            <input
              name="preco"
              placeholder="Preço"
              value={form.preco}
              onChange={handleChange}
            />
            <input
              name="estoque"
              placeholder="Estoque"
              value={form.estoque}
              onChange={handleChange}
            />
            <input
              name="foto"
              placeholder="URL da imagem"
              value={form.foto}
              onChange={handleChange}
            />

            <div className="acoes">
              <button onClick={adicionarProduto}>Salvar</button>
              <button onClick={() => setModalAdd(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDIT */}
      {modalEdit && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Editar produto</h3>

            <input
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
            />
            <input
              name="descricao"
              placeholder="Descrição"
              value={form.descricao}
              onChange={handleChange}
            />
            <input
              name="preco"
              placeholder="Preço"
              value={form.preco}
              onChange={handleChange}
            />
            <input
              name="estoque"
              placeholder="Estoque"
              value={form.estoque}
              onChange={handleChange}
            />
            <input
              name="foto"
              placeholder="URL da imagem"
              value={form.foto}
              onChange={handleChange}
            />

            <div className="acoes">
              <button onClick={salvarEdicao}>Salvar</button>
              <button onClick={() => setModalEdit(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
