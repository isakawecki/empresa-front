import './style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

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
  const [loading, setLoading] = useState(false);

  const cadastraar = async () => {
    console.log("tipo axios:", typeof axios);
    console.log("axios:", axios);

    if (!nome || !email || !cpf || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost/gest-o-de-estoque-main/index.php?url=cadastro',
        {
          nome_completo: nome,
          email: email,
          cpf: cpf,
          senha: senha
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(response.data);

      alert('Cadastro realizado com sucesso!');
      navigate('/');

    } catch (erro) {
      console.log(erro.response?.data || erro);

      if (erro.response?.data?.message) {
        alert(erro.response.data.message);
      } else {
        alert('Erro ao cadastrar');
      }

    } finally {
      setLoading(false);
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
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="campo-input">
          <img src={emailIcon} className="icone-input" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="campo-input">
          <img src={cpfIcon} className="icone-input" />
          <input
            type="text"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>

        <div className="campo-input">
          <img src={cadeadoIcon} className="icone-input" />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button onClick={cadastraar} disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

      </div>
    </div>
  );
}

export default Cadastro;