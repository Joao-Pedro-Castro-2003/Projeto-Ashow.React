import React, { useState, navigate } from "react";

//Axios
import api from "../../services/api";

//CSS
import style from "./ModalAdicionarRegistro.module.css";

const ModalAdicionarRegistro = ({
    generos,
    fecharModal,
    tipoMidia,
    setListaExibida,
    arrClassificacaoIndicativa,
}) => {

    const adicionarMidia = async () => {
        const payload = {
            Nome: dadosApi.Nome,
            Genero: {
                GeneroId: Number(dadosApi.Genero.generoId),
                Genero: dadosApi.Genero.genero,
            },
            AnoLancamento: Number(dadosApi.AnoLancamento),
            Sinopse: dadosApi.Sinopse,
            ClassificacaoIndicativa: Number(dadosApi.ClassificacaoIndicativa),
            Diretor: dadosApi.Diretor,
            TempoDuracao: Number(dadosApi.TempoDuracao),
            QtdeEpisodios: Number(dadosApi.QtdeEpisodios),
        };
        try {
            let res;
            if (tipoMidia == "Filmes") {
                res = await api.post("Ashow/InserirFilme", payload);
            } else {
                res = await api.post("Ashow/InserirSerie", payload);
            }
            fecharModal();
            setListaExibida(res.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                navigate("/");
            }
            alert(err.response.data);
        }
    };
    const [dadosApi, setDadosApi] = useState({
        Nome: "",
        Genero: {
            generoId: 0,
            genero: "",
        },
        AnoLancamento: "",
        Sinopse: "",
        ClassificacaoIndicativa: "",
        Diretor: "",
        TempoDuracao: "",
        QtdeEpisodios: "",
    });

    const limparCampos = () => {
        setDadosApi({
            Nome: "",
            Genero: { generoId: 0, genero: "" },
            AnoLancamento: "",
            Sinopse: "",
            ClassificacaoIndicativa: "",
            Diretor: "",
            TempoDuracao: "",
            QtdeEpisodios: "",
        });
    };

    return (
        <div className={style.container}>
            <div className={style.conteudo}>
                <h2>Adicionar {tipoMidia}</h2>
                <p>Prencha todos os campos para realizar o cadastro</p>
                <form className={style.formulario}>
                    <label>
                        <span>Título</span>
                        <input
                            type="text"
                            placeholder="Ex: Carros"
                            value={dadosApi.Nome}
                            onChange={(e) =>
                                setDadosApi((prev) => ({
                                    ...prev,
                                    Nome: e.target.value,
                                }))
                            }
                        />
                    </label>
                    <label>
                        <span>Gênero</span>
                        <select
                            value={dadosApi.Genero.generoId}
                            onChange={(e) => {
                                const generoSelecionado = generos.find(
                                    (g) => g.generoId === Number(e.target.value)
                                );
                                setDadosApi((prev) => ({
                                    ...prev,
                                    Genero: generoSelecionado || { generoId: 0, genero: "" },
                                }));
                            }}
                        >
                            <option value={0}>Selecione um gênero</option>
                            {generos &&
                                generos.map((item) => (
                                    <option key={item.generoId} value={item.generoId}>
                                        {item.genero}
                                    </option>
                                ))}
                        </select>
                    </label>
                    <label>
                        <span>Ano de Lançamento</span>
                        <input
                            type="text"
                            placeholder="Ex: 2000"
                            value={dadosApi.AnoLancamento}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,4}$/.test(value)) {
                                    setDadosApi((prev) => ({
                                        ...prev,
                                        AnoLancamento: value,
                                    }));
                                }
                            }}
                        />
                    </label>
                    <label>
                        <span>Sinopse</span>
                        <textarea
                            className={style.sinopse}
                            type="text"
                            value={dadosApi.Sinopse}
                            placeholder="Se necessário aumente"
                            onChange={(e) =>
                                setDadosApi((prev) => ({
                                    ...prev,
                                    Sinopse: e.target.value,
                                }))
                            }
                        />
                    </label>
                    <label>
                        <span>Classificação Indicativa</span>
                        <select
                            value={dadosApi.ClassificacaoIndicativa}
                            onChange={(e) =>
                                setDadosApi((prev) => ({
                                    ...prev,
                                    ClassificacaoIndicativa: Number(e.target.value)
                                }))
                            }
                        >
                            <option value="">Selecione a classificação</option>
                            {arrClassificacaoIndicativa.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </label>
                    {tipoMidia === "Filmes" ? (
                        <>
                            <label>
                                <span>Diretor</span>
                                <input
                                    type="text"
                                    value={dadosApi.Diretor}
                                    placeholder="Ex: Steven Spielberg"
                                    onChange={(e) =>
                                        setDadosApi((prev) => ({
                                            ...prev,
                                            Diretor: e.target.value,
                                        }))
                                    }
                                />
                            </label>

                            <label className={style.inputDuracao}>
                                <span>
                                    Duração em minutos:
                                    <span className={style.exemploDuracao}> Ex: 175</span>
                                </span>
                                <input
                                    type="text"
                                    value={dadosApi.TempoDuracao}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d{0,3}$/.test(value)) {
                                            setDadosApi((prev) => ({
                                                ...prev,
                                                TempoDuracao: Number(value),
                                            }));
                                        }
                                    }}
                                />
                            </label>
                        </>
                    ) : (
                        <>
                            <label className={style.qtdeEpisodios}>
                                <span>Quantidade de episódios</span>
                                <input
                                    type="text"
                                    placeholder="Ex: 100"
                                    value={dadosApi.QtdeEpisodios}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d{0,4}$/.test(value)) {
                                            setDadosApi((prev) => ({
                                                ...prev,
                                                QtdeEpisodios: Number(value),
                                            }));
                                        }
                                    }}
                                />
                            </label>
                        </>
                    )}
                </form>
                <div className={style.botoes}>
                    <button onClick={fecharModal}>Cancelar</button>
                    <button onClick={limparCampos}>Limpar</button>
                    <button className={style.btnAdicionar} onClick={adicionarMidia}>
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAdicionarRegistro;
