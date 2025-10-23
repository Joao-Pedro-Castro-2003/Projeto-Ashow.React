import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api.js";

//CSS
import style from "./Login.module.css";

const Login = () => {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  const handleNome = (e) => setNome(e.target.value);
  const handleSenha = (e) => setSenha(e.target.value);

  const realizartLogin = async () => {
    const payload = {
      Nome: nome,
      Senha: senha,
    };

    api
      .post("Login", payload)
      .then(() => {
        navigate(`/home`);
      })
      .catch((err) => {
        alert(err.response.data || "Erro ao fazer login.");
      });
  };

  return (
    <div className={style.container}>
      <form className={ style.formulario }>
        <h2>Inscreva-se</h2>
        <div className={style.form}>
          <label>
            <span>Usuário: </span>
            <input
              type="text"
              name="usuario"
              id="usuario"
              placeholder="Digite seu usuário"
              onChange={handleNome}
              value={nome}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <span>Senha: </span>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Digite sua senha"
              onChange={handleSenha}
              value={senha}
              required
            />
          </label>
        </div>
        <p>
          <button type="button" onClick={realizartLogin}>
            Entrar
          </button>
        </p>
        <Link className={style.link} to="cadastro">
          Crie uma conta
        </Link>
      </form>
    </div>
  );
};

export default Login;
