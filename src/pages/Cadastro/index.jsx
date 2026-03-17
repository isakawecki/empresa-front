import './style.css';
import { useNavigate } from 'react-router-dom';
import perfilIcon from '../../assets/perfil.png';
import cadeadoIcon from '../../assets/cadeado.png';
import emailIcon from '../../assets/email.png';
import cpfIcon from '../../assets/cpf.png';


function Cadastro() {
  const navigate = useNavigate();

  return (
    <div className="container-principal">
      <div className="caixa-login">

        <div className="voltar" onClick={() => navigate('/')}>
          ←
        </div>

        <h2>CADASTRO</h2>

        <div className="campo-input">
          <img src={perfilIcon} className="icone-input" />
          <input type="text" placeholder="Nome" />
        </div>

        <div className="campo-input">
          <img src={emailIcon} className="icone-input" />
          <input type="email" placeholder="Email" />
        </div>

        <div className="campo-input">
          <img src={cpfIcon} className="icone-input" />
          <input type="text" placeholder="CPF" />
        </div>

        <div className="campo-input">
          <img src={cadeadoIcon} className="icone-input" />
          <input type="password" placeholder="Senha" />
        </div>

        <button onClick={() => navigate('/menu')}>Cadastrar</button>
      </div>
    </div>
  );
}

export default Cadastro;