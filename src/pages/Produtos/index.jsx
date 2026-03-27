import { useState, useEffect } from "react";
import axios from "axios";
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

 
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const resposta = await axios.get("http://localhost:5000/produtos");
      setProdutos(resposta.data);
    } catch (erro) {
      console.log(erro);
      alert("Erro ao carregar produtos");
    }
  };

 
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const adicionarProduto = async () => {
    if (!form.nome || !form.preco || !form.estoque) {
      alert("Preencha os campos");
      return;
    }

    try {
      await axios.post("http://localhost:5000/produtos", form);
      await carregarProdutos();

      limparForm();
      setModalAdd(false);
    } catch (erro) {
      console.log(erro);
      alert("Erro ao adicionar");
    }
  };


  const abrirEditar = () => {
    setForm(selecionado);
    setModalEdit(true);
  };


  const salvarEdicao = async () => {
    try {
      await axios.put(
        `http://localhost:5000/produtos/${form.id}`,
        form
      );

      await carregarProdutos();

      setSelecionado(form);
      limparForm();
      setModalEdit(false);
    } catch (erro) {
      console.log(erro);
      alert("Erro ao editar");
    }
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
                <td>{p.nome}</td>
                <td>{p.descricao}</td>
                <td>{p.estoque}</td>
                <td>R$ {p.preco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  
      {selecionado && (
        <div className="detalhe">
          <div className="topo-detalhe">
            <h3>Produto</h3>
            <button onClick={() => setSelecionado(null)}>X</button>
          </div>

          <img src={selecionado.foto} alt="" />

          <p><b>Nome:</b> {selecionado.nome}</p>
          <p><b>Descrição:</b> {selecionado.descricao}</p>
          <p><b>Preço:</b> R$ {selecionado.preco}</p>
          <p><b>Estoque:</b> {selecionado.estoque}</p>

          <button onClick={abrirEditar}>Editar</button>
        </div>
      )}

 
      {modalAdd && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Adicionar Produto</h3>

            <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" />
            <input name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" />
            <input name="preco" type="number" value={form.preco} onChange={handleChange} placeholder="Preço" />
            <input name="estoque" type="number" value={form.estoque} onChange={handleChange} placeholder="Estoque" />
            <input name="foto" value={form.foto} onChange={handleChange} placeholder="URL da imagem" />

            <div className="acoes">
              <button onClick={adicionarProduto}>Salvar</button>
              <button onClick={() => setModalAdd(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}


      {modalEdit && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Editar Produto</h3>

            <input name="nome" value={form.nome} onChange={handleChange} />
            <input name="descricao" value={form.descricao} onChange={handleChange} />
            <input name="preco" type="number" value={form.preco} onChange={handleChange} />
            <input name="estoque" type="number" value={form.estoque} onChange={handleChange} />
            <input name="foto" value={form.foto} onChange={handleChange} />

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