import './style.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import perfilIcon from '../../assets/perfil.png';
import cadeadoIcon from '../../assets/cadeado.png';
import emailIcon from '../../assets/email.png';
import cpfIcon from '../../assets/cpf.png';

function Cadastro() {
  const navigate = useNavigate();


  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  
  const cadastrar = async () => {
    try {
      await axios.post('http://localhost:5000/cadastro', {
        nome,
        email,
        cpf,
        senha
      });

      alert('Cadastro realizado com sucesso!');
      navigate('/'); 

    } catch (erro) {
      console.log(erro);
      alert('Erro ao cadastrar');
    }
  };

  return (
    <div className="container-principal">
      <div className="caixa-login">

        <div className="voltar" onClick={() => navigate('/')}>
          ←
        </div>

        <h2>CADASTRO</h2>

        
        <div className="campo-input">
          <img src={perfilIcon} className="icone-input" />
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

       
        <div className="campo-input">
          <img src={emailIcon} className="icone-input" />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

    
        <div className="campo-input">
          <img src={cpfIcon} className="icone-input" />
          <input
            type="text"
            placeholder="CPF"
            onChange={(e) => setCpf(e.target.value)}
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

        
        <button onClick={cadastrar}>Cadastrar</button>

      </div>
    </div>
  );
}

export default Cadastro;