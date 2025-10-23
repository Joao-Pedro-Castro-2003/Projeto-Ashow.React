import { useNavigate } from "react-router-dom";

//axios
import api from "../../services/api";

//CSS
import style from "./Home.module.css";


const Home = () => {
  const navigate = useNavigate();

  const buscaFilmes = async (e) => {
    e.preventDefault();
    api.get("Ashow/BuscaFilmes")
      .then((res) => {
         navigate("/Listagem", {
          state: {
            lista: res.data,
            tipoMidia: "Filmes"
          }
        })
    });
  };

  const buscaSeries = async (e) => {
    e.preventDefault();
    api.get("Ashow/BuscaSeries")
      .then((res) => {
        navigate("/Listagem", {
          state: {
            lista: res.data,
            tipoMidia: "Séries"
          }
        })
    });
  };

  return (
    <div className={style.container}>
      <div className={style.titulo}>
        <h1>O que você deseja assistir?</h1>
      </div>
      <div className={style.cards}>
        <section className={style.filme} onClick={buscaFilmes}>
          Filmes
        </section>
        <section className={style.filme} onClick={buscaSeries}>
          Séries
        </section>
      </div>
    </div>
  );
};

export default Home;
