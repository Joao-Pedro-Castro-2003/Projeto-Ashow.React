import React from 'react'

//CSS
import style from './ModalExcluirRegistro.module.css'

const ModalExcluirRegistro = ({ tipoMidia, fecharModal, excluir }) => {
    return (
        <div className={style.container}>
            <div className={style.content}>
                <h2>Excluir {tipoMidia}</h2>
                <p>Tem certeza que deseja excluir este registro?</p>

                <div className={style.buttons}>
                    <button className={style.btnCancelar} onClick={fecharModal}>Cancelar</button>
                    <button className={style.btnExcluir} onClick={excluir}>Excluir</button>
                </div>
            </div>
        </div>
    )
}

export default ModalExcluirRegistro
