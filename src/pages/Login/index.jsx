import "./style.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import perfilIcon from "../../assets/perfil.png";
import cadeadoIcon from "../../assets/cadeado.png";

function Login() {
  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


const fazerLogin = async () => {
  try {
    const resposta = await axios.post(
      "http://localhost/gest-o-de-estoque-main/index.php?url=login",
      {
        email,
        senha,
      }
    );

    if (resposta.data.status === "ok") {
      navigate("/menu");
    } else {
      alert(resposta.data.message || "Email ou senha inválidos");
    }
  } catch (erro) {
    console.log(erro);
    alert("Erro ao conectar com o servidor");
  }
};

  return (
    <div className="container-principal">
      <div className="caixa-login">
        <h2>LOGIN</h2>

   
        <div className="campo-input">
          <img src={perfilIcon} className="icone-input" />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

    
        <div className="campo-input">
          <img src={cadeadoIcon} className="icone-input" />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <div className="opcoes">
          <label>
            <input type="checkbox" />
            Lembrar de mim
          </label>

          <span className="esqueceu-senha">Esqueceu a senha?</span>
        </div>


        <button onClick={fazerLogin}>Entrar</button>

        <div className="divisor">OU</div>

        <p>
          Primeiro acesso?{" "}
          <span className="cadastrar" onClick={() => navigate("/cadastro")}>
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;