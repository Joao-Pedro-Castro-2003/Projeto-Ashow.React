import React, { useState, navigate } from "react";

//CSS
import style from "./ModalEditarRegistro.module.css";

//Axios
import api from "../../services/api";

const ModalEditarRegistro = ({
    tipoMidia,
    fecharModal,
    generos,
    registroSelecionado,
    setRegistroSelecionado,
    setListaExibida,
    arrClassificacaoIndicativa,
}) => {
    const limparCampos = () => {
        setRegistroSelecionado({
            filmeId: registroSelecionado.filmeId,
            nome: "",
            genero: {
                generoId: 0,
                genero: "",
            },
            anoLancamento: 0,
            sinopse: "",
            classificacaoIndicativa: 0,
            diretor: "",
            tempoDuracao: 0,
            qtdeEpisodios: 0,
        });
    };

    const atualizarSerie = async (registroSelecionado) => {
        const payload = {
            SerieId: registroSelecionado.serieId,
            Nome: registroSelecionado.nome,
            Genero: {
                generoId: registroSelecionado.genero.generoId,
                genero: registroSelecionado.genero.genero,
            },
            AnoLancamento: registroSelecionado.anoLancamento,
            Sinopse: registroSelecionado.sinopse,
            ClassificacaoIndicativa: registroSelecionado.classificacaoIndicativa,
            QtdeEpisodios: registroSelecionado.qtdeEpisodios,
        };
        try {
            let res = await api.put("Ashow/AtualizarSerie", payload);
            fecharModal();
            setListaExibida(res.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                navigate("/");
            }
            console.error(err.message);
        }
    };

    const atualizarFilme = async (registroSelecionado) => {
        const payload = {
            FilmeId: registroSelecionado.filmeId,
            Nome: registroSelecionado.nome,
            Genero: {
                generoId: registroSelecionado.genero.generoId,
                genero: registroSelecionado.genero.genero,
            },
            AnoLancamento: registroSelecionado.anoLancamento,
            Sinopse: registroSelecionado.sinopse,
            ClassificacaoIndicativa: registroSelecionado.classificacaoIndicativa,
            Diretor: registroSelecionado.diretor,
            TempoDuracao: registroSelecionado.tempoDuracao,
        };
        try {
            let res = await api.put("Ashow/AtualizarFilme", payload);
            fecharModal();
            setListaExibida(res.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                navigate("/");
            }
            alert(err.response.data);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.conteudo}>
                <h2>Editar {tipoMidia}</h2>
                <p>Prencha todos os campos para realizar a edição</p>

                <form className={style.formulario}>
                    <label>
                        <span>Título</span>
                        <input
                            type="text"
                            placeholder="Ex: Carros"
                            value={registroSelecionado.nome}
                            onChange={(e) =>
                                setRegistroSelecionado({
                                    ...registroSelecionado,
                                    nome: e.target.value,
                                })
                            }
                        />
                    </label>
                    <label>
                        <span>Gênero</span>
                        <select
                            value={registroSelecionado.genero.generoId}
                            onChange={(e) => {
                                const generoSelecionado = generos.find(
                                    (g) => g.generoId === Number(e.target.value)
                                );

                                setRegistroSelecionado({
                                    ...registroSelecionado,
                                    genero: generoSelecionado || { generoId: 0, genero: "" },
                                });
                            }}
                        >
                            <option value="">Selecione um gênero</option>
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
                            value={registroSelecionado.anoLancamento}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d{0,4}$/.test(value)) {
                                    setRegistroSelecionado({
                                        ...registroSelecionado,
                                        anoLancamento: Number(value),
                                    });
                                }
                            }}
                        />
                    </label>
                    <label>
                        <span>Sinopse</span>
                        <textarea
                            className={style.sinopse}
                            type="text"
                            placeholder="Se necessário aumente"
                            value={registroSelecionado.sinopse}
                            onChange={(e) =>
                                setRegistroSelecionado({
                                    ...registroSelecionado,
                                    sinopse: e.target.value,
                                })
                            }
                        />
                    </label>
                    <label>
                        <span>Classificação Indicativa</span>
                        <select
                            value={registroSelecionado.classificacaoIndicativa}
                            onChange={(e) => {
                                setRegistroSelecionado({
                                    ...registroSelecionado,
                                    classificacaoIndicativa: Number(e.target.value),
                                });
                            }}
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
                                    placeholder="Ex: Steven Spielberg"
                                    value={registroSelecionado.diretor}
                                    onChange={(e) =>
                                        setRegistroSelecionado({
                                            ...registroSelecionado,
                                            diretor: e.target.value,
                                        })
                                    }
                                />
                            </label>

                            <label className={style.inputDuracao}>
                                <span>
                                    Duração em minutos:{" "}
                                    <span className={style.exemploDuracao}>Ex: 175</span>
                                </span>
                                <input
                                    type="text"
                                    value={registroSelecionado.tempoDuracao}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d{0,3}$/.test(value)) {
                                            setRegistroSelecionado({
                                                ...registroSelecionado,
                                                tempoDuracao: Number(value),
                                            });
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
                                    value={registroSelecionado.qtdeEpisodios}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (/^\d{0,4}$/.test(value)) {
                                            setRegistroSelecionado({
                                                ...registroSelecionado,
                                                qtdeEpisodios: Number(value),
                                            });
                                        }
                                    }}
                                />
                            </label>
                        </>
                    )}
                </form>

                <div className={style.botoes}>
                    <button className={style.btnCancelar} onClick={fecharModal}>
                        Cancelar
                    </button>
                    <button className={style.btnLimpar} onClick={limparCampos}>
                        Limpar
                    </button>
                    <button
                        className={style.btnEditar}
                        onClick={() =>
                            tipoMidia === "Filmes"
                                ? atualizarFilme(registroSelecionado)
                                : atualizarSerie(registroSelecionado)
                        }
                    >
                        Editar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEditarRegistro;
