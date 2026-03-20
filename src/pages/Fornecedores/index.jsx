import { useState } from "react";
import "./style.css";

const salvarLocal = (chave, dados) => {
  localStorage.setItem(chave, JSON.stringify(dados));
};

const pegarLocal = (chave) => {
  return JSON.parse(localStorage.getItem(chave)) || [];
};

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState(pegarLocal("fornecedores"));
  const [selecionado, setSelecionado] = useState(null);

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const [form, setForm] = useState({
    id: null,
    nome_empresa: "",
    cnpj: "",
    telefone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const adicionar = () => {
    const novo = { ...form, id: Date.now() };
    const novos = [...fornecedores, novo];

    setFornecedores(novos);
    salvarLocal("fornecedores", novos);

    limpar();
    setModalAdd(false);
  };

  const abrirEditar = () => {
    setForm(selecionado);
    setModalEdit(true);
  };

  const salvarEdicao = () => {
    const novos = fornecedores.map(f => f.id === form.id ? form : f);

    setFornecedores(novos);
    salvarLocal("fornecedores", novos);

    setSelecionado(form);
    setModalEdit(false);
  };

  const deletar = () => {
    const novos = fornecedores.filter(f => f.id !== selecionado.id);

    setFornecedores(novos);
    salvarLocal("fornecedores", novos);

    setSelecionado(null);
  };

  const limpar = () => {
    setForm({
      id: null,
      nome_empresa: "",
      cnpj: "",
      telefone: "",
    });
  };

  return (
    <div className="container-produtos">

      <div className="lista">
        <div className="topo">
          <h2>Fornecedores</h2>
          <button onClick={() => setModalAdd(true)}>+ Adicionar</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Empresa</th>
              <th>CNPJ</th>
              <th>Telefone</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map(f => (
              <tr key={f.id} onClick={() => setSelecionado(f)}>
                <td className="nome-produto">{f.nome_empresa}</td>
                <td>{f.cnpj}</td>
                <td>{f.telefone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selecionado && (
        <div className="detalhe">
          <h3>Fornecedor</h3>

          <p><b>Empresa:</b> {selecionado.nome_empresa}</p>
          <p><b>CNPJ:</b> {selecionado.cnpj}</p>
          <p><b>Telefone:</b> {selecionado.telefone}</p>

          <button onClick={abrirEditar}>Editar</button>
          <button onClick={deletar}>Remover</button>
        </div>
      )}

      {modalAdd && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Novo fornecedor</h3>

            <input name="nome_empresa" placeholder="Empresa" onChange={handleChange}/>
            <input name="cnpj" placeholder="CNPJ" onChange={handleChange}/>
            <input name="telefone" placeholder="Telefone" onChange={handleChange}/>

            <div className="acoes">
              <button onClick={adicionar}>Salvar</button>
              <button onClick={() => setModalAdd(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {modalEdit && (
        <div className="modal-bg">
          <div className="modal">
            <h3>Editar fornecedor</h3>

            <input name="nome_empresa" value={form.nome_empresa} onChange={handleChange}/>
            <input name="cnpj" value={form.cnpj} onChange={handleChange}/>
            <input name="telefone" value={form.telefone} onChange={handleChange}/>

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