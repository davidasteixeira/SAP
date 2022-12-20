
const abrirModal = (elemento) => {
    let modal = document.querySelector('#modalRegistro');

    let campoUsuarioSelecionado = document.querySelector('#usuarioSelecionado');
    let codigoUsuarioSelecionado = document.querySelector('#codigoUsuario');

    let user_name = elemento.parentNode.children['usuario-name'].textContent;
    let user_id = elemento.parentNode.children['usuario-id'].textContent;
    
    campoUsuarioSelecionado.value = user_name;
    codigoUsuarioSelecionado.value = user_id;
    modal.style.display = 'block'
    
}

const fecharModal = () => {
    let modal = document.querySelector('#modalRegistro');
    modal.style.display = 'none'
}

const dadosModalRegistro = () => {
    //let campoUsuarioSelecionado = document.querySelector('#usuarioSelecionado').value;
    let codigoUsuarioSelecionado = document.querySelector('#codigoUsuario').value;


    return {
        id: Number.parseInt(codigoUsuarioSelecionado)
    }
}

const deletarUsuario = async () => {

    body = await dadosModalRegistro();

    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    await fetch(`http://localhost/usuarios/${body.id}`, options)
    .then(res => { res.json() })
    .then(response => {
        return response
    })

    await fecharModal()

    //SetTimeout é para atualizar a página apenas depois de fechar o modal e finalizar requisição.
    let atualizarPagina = setTimeout(async function(){
        await document.location.reload(true)
    },500)
    
    await atualizarPagina();
    
}
