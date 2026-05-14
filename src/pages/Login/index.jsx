import "./login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import perfilIcon from "../../assets/perfil.png";
import cadeadoIcon from "../../assets/cadeado.png";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  // ===== CRIA ADMIN PADRÃO =====
  const adminExiste =
    localStorage.getItem("admin");

  if (!adminExiste) {

    const adminPadrao = {

      nome: "Administrador",

      email: "admin@empresa.com",

      senha: "123",

      vendas: 0,

      faturamento: 0,
    };

    localStorage.setItem(
      "admin",
      JSON.stringify(adminPadrao)
    );
  }

  // ===== LOGIN =====
  const fazerLogin = () => {

    // ===== ADMIN =====
    const admin = JSON.parse(
      localStorage.getItem("admin")
    );

    if (
      admin &&
      email === admin.email &&
      senha === admin.senha
    ) {

      localStorage.setItem(
        "logado",
        "true"
      );

      localStorage.setItem(
        "tipoUsuario",
        "admin"
      );

      // salva usuário logado
      localStorage.setItem(
        "usuarioLogado",
        admin.email
      );

      alert("Login ADM realizado!");

      navigate("/menu");

      return;
    }

    // ===== FUNCIONÁRIOS =====
    const funcionarios =
      JSON.parse(
        localStorage.getItem(
          "funcionarios"
        )
      ) || [];

    const funcionarioEncontrado =
      funcionarios.find(
        (funcionario) =>

          funcionario.email === email &&
          funcionario.senha === senha
      );

    if (funcionarioEncontrado) {

      localStorage.setItem(
        "logado",
        "true"
      );

      localStorage.setItem(
        "tipoUsuario",
        "funcionario"
      );

      // salva funcionário logado
      localStorage.setItem(
        "usuarioLogado",
        funcionarioEncontrado.email
      );

      alert("Login realizado!");

      navigate("/menu");

      return;
    }

    alert("Email ou senha inválidos");
  };

  return (
    <div className="container-principal">

      <div className="caixa-login">

        <h2>LOGIN</h2>

        {/* EMAIL */}
        <div className="campo-input">

          <img
            src={perfilIcon}
            className="icone-input"
          />

          <input
            type="text"
            placeholder="Email"
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

        </div>

        {/* SENHA */}
        <div className="campo-input">

          <img
            src={cadeadoIcon}
            className="icone-input"
          />

          <input
            type="password"
            placeholder="Senha"
            onChange={(e) =>
              setSenha(
                e.target.value
              )
            }
          />

        </div>

        {/* OPÇÕES */}
        <div className="opcoes">

          <label>

            <input type="checkbox" />

            Lembrar de mim

          </label>

          <span className="esqueceu-senha">
            Esqueceu a senha?
          </span>

        </div>

        {/* BOTÃO */}
        <button onClick={fazerLogin}>
          Entrar
        </button>

      </div>

    </div>
  );
}

export default Login;