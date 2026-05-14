import "./style.css";

import { useEffect, useState } from "react";

function Funcionarios() {

  const [nome, setNome] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const [area, setArea] =
    useState("");

  const [pesquisa, setPesquisa] =
    useState("");

  const [funcionarios, setFuncionarios] =
    useState([]);

  const [funcionarioAberto, setFuncionarioAberto] =
    useState(null);

  // ===== CARREGAR =====
  useEffect(() => {

    const carregarFuncionarios = () => {

      const lista =
        JSON.parse(
          localStorage.getItem(
            "funcionarios"
          )
        ) || [];

      setFuncionarios(lista);
    };

    // carrega ao abrir
    carregarFuncionarios();

    // atualiza automaticamente
    window.addEventListener(
      "funcionariosAtualizados",
      carregarFuncionarios
    );

    return () =>
      window.removeEventListener(
        "funcionariosAtualizados",
        carregarFuncionarios
      );

  }, []);

  // ===== CADASTRAR =====
  const cadastrarFuncionario = () => {

    if (
      !nome ||
      !email ||
      !senha ||
      !area
    ) {

      alert(
        "Preencha todos os campos"
      );

      return;
    }

    const funcionariosSalvos =
      JSON.parse(
        localStorage.getItem(
          "funcionarios"
        )
      ) || [];

    // verifica email duplicado
    const existe =
      funcionariosSalvos.find(
        (funcionario) =>
          funcionario.email ===
          email
      );

    if (existe) {

      alert(
        "Email já cadastrado"
      );

      return;
    }

    // ===== NOVO FUNCIONÁRIO =====
    const novoFuncionario = {

      nome,

      email,

      senha,

      area,

      vendas: 0,

      faturamento: 0,
    };

    // ===== SALVA =====
    const novaLista = [
      ...funcionariosSalvos,
      novoFuncionario,
    ];

    localStorage.setItem(
      "funcionarios",
      JSON.stringify(novaLista)
    );

    setFuncionarios(novaLista);

    // ===== LIMPA CAMPOS =====
    setNome("");

    setEmail("");

    setSenha("");

    setArea("");

    alert(
      "Funcionário cadastrado!"
    );
  };

  // ===== REMOVER =====
  const removerFuncionario = (
    emailFuncionario
  ) => {

    const novaLista =
      funcionarios.filter(
        (funcionario) =>
          funcionario.email !==
          emailFuncionario
      );

    localStorage.setItem(
      "funcionarios",
      JSON.stringify(novaLista)
    );

    setFuncionarios(novaLista);

    alert(
      "Funcionário removido!"
    );
  };

  // ===== PESQUISA =====
  const funcionariosFiltrados =
    funcionarios.filter(
      (funcionario) =>

        funcionario.nome
          .toLowerCase()
          .includes(
            pesquisa.toLowerCase()
          )
    );

  return (
    <div className="container-funcionarios">

      <div className="caixa-funcionarios">

        <h1>Funcionários</h1>

        {/* FORM */}
        <div className="form-funcionario">

          <div className="campo-input">

            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) =>
                setNome(
                  e.target.value
                )
              }
            />

          </div>

          <div className="campo-input">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

          </div>

          <div className="campo-input">

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) =>
                setSenha(
                  e.target.value
                )
              }
            />

          </div>

          <div className="campo-input">

            <input
              type="text"
              placeholder="Área de trabalho"
              value={area}
              onChange={(e) =>
                setArea(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* BOTÃO */}
        <button
          className="botao-cadastrar"
          onClick={
            cadastrarFuncionario
          }
        >
          Cadastrar Funcionário
        </button>

        {/* PESQUISA */}
        <div className="pesquisa">

          <input
            type="text"
            placeholder="Pesquisar funcionário..."
            value={pesquisa}
            onChange={(e) =>
              setPesquisa(
                e.target.value
              )
            }
          />

        </div>

        {/* LISTA */}
        <div className="lista-funcionarios">

          {funcionariosFiltrados.map(
            (funcionario) => (

            <div
              className="card-funcionario"
              key={funcionario.email}
            >

              {/* TOPO */}
              <div className="topo-funcionario">

                <div>

                  <h3>
                    {funcionario.nome}
                  </h3>

                  <p>
                    {funcionario.email}
                  </p>

                </div>

                <div className="acoes">

                  {/* VER MAIS */}
                  <button
                    className="botao-ver"
                    onClick={() =>

                      setFuncionarioAberto(

                        funcionarioAberto ===
                        funcionario.email

                          ? null

                          : funcionario.email
                      )
                    }
                  >

                    {funcionarioAberto ===
                    funcionario.email

                      ? "Fechar"

                      : "Ver Mais"}

                  </button>

                  {/* REMOVER */}
                  <button
                    className="botao-remover"
                    onClick={() =>
                      removerFuncionario(
                        funcionario.email
                      )
                    }
                  >
                    Remover
                  </button>

                </div>

              </div>

              {/* DETALHES */}
              {funcionarioAberto ===
                funcionario.email && (

                <div className="detalhes">

                  <p>

                    <strong>
                      Nome completo:
                    </strong>

                    {" "}
                    {funcionario.nome}

                  </p>

                  <p>

                    <strong>
                      Área:
                    </strong>

                    {" "}
                    {funcionario.area}

                  </p>

                  {/* ESTATÍSTICAS */}
                  <div className="estatisticas">

                    <div className="card-estatistica">

                      <h3>
                        {funcionario.vendas || 0}
                      </h3>

                      <span>
                        Vendas realizadas
                      </span>

                    </div>

                    <div className="card-estatistica">

                      <h3>
                        R$
                        {funcionario.faturamento || 0}
                      </h3>

                      <span>
                        Faturamento
                      </span>

                    </div>

                  </div>

                </div>
              )}

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Funcionarios;