import "./style.css";
import { useNavigate } from "react-router-dom";
import perfilIcon from "../../assets/perfil.png";
import cadeadoIcon from "../../assets/cadeado.png";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="container-principal">
      <div className="caixa-login">
        <h2>LOGIN</h2>

        <div className="campo-input">
          <img src={perfilIcon} className="icone-input" />
          <input type="text" placeholder="Usuário" />
        </div>

        <div className="campo-input">
          <img src={cadeadoIcon} className="icone-input" />
          <input type="password" placeholder="Senha" />
        </div>

        <div className="opcoes">
          <label>
            <input type="checkbox" />
            Lembrar de mim
          </label>

          <span className="esqueceu-senha">Esqueceu a senha?</span>
        </div>

        <button onClick={() => navigate("/menu")}>Entrar</button>

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
