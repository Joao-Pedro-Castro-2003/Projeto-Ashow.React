import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//Axios
import api from "../../services/api";

//CSS
import style from "./CadastroUsuario.module.css";

const CadastroUsuario = () => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [senhaUsuario, setSenhaUsuario] = useState("");
  const [emailUsuario, setEmailUsuario] = useState("");

  const alteraNomeUsuario = (e) => setNomeUsuario(e.target.value);
  const alteraSenhaUsuario = (e) => setSenhaUsuario(e.target.value);
  const alteraEmailUsuario = (e) => setEmailUsuario(e.target.value);

  const navigate = useNavigate();

  const limpaCampos = () => {
    setNomeUsuario("");
    setSenhaUsuario("");
    setEmailUsuario("");
  };

  const cadastrarUsuario = () => {
    const payload = {
      Nome: nomeUsuario,
      Senha: senhaUsuario,
      Email: emailUsuario,
    };

    api
      .post("Usuario/Cadastrar", payload)
      .then((res) => {
        alert(res.data);
        navigate("/");
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          alert("Token expirado, faça o login novamente");
        } else if (error.response?.data) {
          alert(error.response.data);
        } else {
          alert("Erro ao realizar o cadastro.");
        }
      })
  };

  return (
    <div className={style.container}>
      <form className={style.form}>
        <h2>Preencha os campos abaixo</h2>
        <label>
          <span>Usuário</span>
          <input
            type="text"
            placeholder="Preencha seu Usuário"
            onChange={alteraNomeUsuario}
            value={nomeUsuario}
            required
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            placeholder="Preencha sua Senha"
            onChange={alteraSenhaUsuario}
            value={senhaUsuario}
            required
          />
        </label>
        <label>
          <span>E-mail</span>
          <input
            type="email"
            placeholder="Preencha seu E-mail"
            onChange={alteraEmailUsuario}
            value={emailUsuario}
            required
          />
        </label>
        <button type="button" onClick={cadastrarUsuario}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default CadastroUsuario;
