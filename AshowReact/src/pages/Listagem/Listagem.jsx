import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//CSS
import style from "./Listagem.module.css";

//Axios
import api from "../../services/api";

//Compoenente
import ModalExcluirRegistro from "../../components/ModalExcluirRegistro/ModalExcluirRegistro";
import ModalEditarRegistro from "../../components/ModalEditarRegistro/ModalEditarRegistro";
import ModalAdicionarRegistro from "../../components/ModalAdicionarRegistro/ModalAdicionarRegistro";

const Listagem = () => {
  const location = useLocation();
  const { lista, tipoMidia } = location.state || {};

  const [generos, setGeneros] = useState([]);
  const [listaExibida, setListaExibida] = useState(lista || []);
  const [exibeModalExclusao, setExibeModalExclusao] = useState(false);
  const [exibeModalEdicao, setExibeModalEdicao] = useState(false);
  const [exibeModalAdicao, setExibeModalAdicao] = useState(false);
  const [idSelecionado, setIdSelecionado] = useState(null);
  const [registroSelecionado, setRegistroSelecionado] = useState({});

  const arrClassificacaoIndicativa = [10, 12, 14, 16, 18];

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("Ashow/BuscaGeneros")
      .then((res) => setGeneros(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filtrarPorGenero = async (generoId) => {
    if (!generoId) {
      setListaExibida(lista || []);
      return;
    }

    try {
      const res = await api.get("Ashow/BuscaFilmesPorGenero", {
        params: { generoId },
      });
      setListaExibida(res.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        navigate("/");
      }
      console.error(err);
    }
  };

  const excluirRegistro = async (id) => {
    try {
      let res;
      if (tipoMidia == "Filmes") {
        res = await api.delete(`Ashow/DeletarFilme?filmeId=${id}`);
      } else if (tipoMidia == "Séries") {
        res = await api.delete(`Ashow/DeletarSerie?serieId=${id}`);
      }
      setListaExibida(res.data);
      setExibeModalExclusao(false);
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          navigate("/"); // redireciona para a home
        } else {
          alert(err.response.data); // mensagem vinda do backend
        }
      } else {
        alert(err.message);
      }
    }
  };

  const voltar = () => {
    navigate("/home");
  };

  return (
    <div className={style.container}>
      <h1 className={style.titulo}>{tipoMidia}</h1>
      <div className={style.selecaoGenero}>
        <select
          onChange={(e) => filtrarPorGenero(e.target.value)}
          name="genero"
          id="genero"
        >
          <option value="">Escolha um gênero</option>
          <option value="">Todos</option>
          {generos &&
            generos.map((item) => (
              <option key={item.generoId} value={item.generoId}>
                {item.genero}
              </option>
            ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Gênero</th>
            <th>Ano de Lançamento</th>
            <th>Sinopse</th>
            <th>Classificação Indicativa</th>
            {tipoMidia == "Filmes" ? <th>Diretor</th> : null}
            {tipoMidia == "Filmes" ? <th>Duração</th> : null}
            {tipoMidia == "Séries" ? <th>Quantidade de Episódios</th> : null}
            <th>*</th>
            <th>*</th>
          </tr>
        </thead>
        <tbody>
          {listaExibida &&
            listaExibida.map((item, index) => (
              <tr key={index}>
                <td>{item.nome}</td>
                <td>{item.genero.genero}</td>
                <td>{item.anoLancamento}</td>
                <td>{item.sinopse}</td>
                <td>{item.classificacaoIndicativa} Anos</td>
                {tipoMidia == "Filmes" ? <td>{item.diretor}</td> : null}
                {tipoMidia == "Filmes" ? (
                  <td>{item.tempoDuracao} Min.</td>
                ) : null}
                {tipoMidia == "Séries" ? <td>{item.qtdeEpisodios}</td> : null}
                <td>
                  <button
                    className={style.btnEditar}
                    onClick={() => {
                      setRegistroSelecionado(item);
                      setExibeModalEdicao(true);
                    }}
                  >
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className={style.btnExcluir}
                    onClick={() => {
                      setIdSelecionado(item.filmeId || item.serieId);
                      setExibeModalExclusao(true);
                    }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className={style.botoes}>
        <button
          className={style.btnAdicionar}
          onClick={() => {
            setExibeModalAdicao(true);
          }}
        >
          Adicionar
        </button>
        <button className={style.btnVoltar} onClick={voltar}>
          Voltar
        </button>
      </div>
      {exibeModalExclusao && (
        <ModalExcluirRegistro
          tipoMidia={tipoMidia}
          fecharModal={() => setExibeModalExclusao(false)}
          excluir={() => excluirRegistro(idSelecionado)}
        />
      )}
      {exibeModalEdicao && (
        <ModalEditarRegistro
          tipoMidia={tipoMidia}
          fecharModal={() => setExibeModalEdicao(false)}
          generos={generos}
          registroSelecionado={registroSelecionado}
          setRegistroSelecionado={setRegistroSelecionado}
          setListaExibida={setListaExibida}
          arrClassificacaoIndicativa={arrClassificacaoIndicativa}
        />
      )}
      {exibeModalAdicao && (
        <ModalAdicionarRegistro
          tipoMidia={tipoMidia}
          fecharModal={() => setExibeModalAdicao(false)}
          generos={generos}
          setListaExibida={setListaExibida}
          arrClassificacaoIndicativa={arrClassificacaoIndicativa}
        />
      )}
    </div>
  );
};

export default Listagem;
