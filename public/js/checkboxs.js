function pacienteCheckbox() {
    let checkAll = document.querySelector("#checkAll");

    if (checkAll.checked) {
        let checkboxs = document.querySelectorAll("#checkboxRegistro");

        checkboxs.forEach(check => {
            check.checked = true;
        });
    } else {
        let checkboxs = document.querySelectorAll("#checkboxRegistro");

        checkboxs.forEach(check => {
            check.checked = false;
        })
    }

}

function TratarPaciente() {
    let checkboxs = document.querySelectorAll('input[type="checkbox"]:not([id=checkAll])');

    let pacientesId = [];

    checkboxs.forEach(item => {
        if (item.checked) {
            pacientesId.push(item.value)
        }
    })

    return pacientesId;
}


const abrirModal = () => {
    let modal = document.querySelector('#modalRegistro');
    let matricula = document.querySelector('#matriculaRegistro');

    modal.style.display = 'block'
    let pacientesString = TratarPaciente().join();
    matricula.value = pacientesString;

}

const fecharModal = () => {
    let modal = document.querySelector('#modalRegistro');


    modal.style.display = 'none'

}

const dadosModalRegistro = () => {
    let atendente = document.querySelector('#atendenteRegistro').value
    let status = document.querySelector('#statusRegistro').value
    let informacao = document.querySelector('#informacaoRegistro').value


    return {
        atendenteRegistro: atendente,
        statusRegistro: status,
        informacaoRegistro: informacao
    }
}

const atualizarPaciente = () => {

    body = dadosModalRegistro();
    matricula = TratarPaciente().toLocaleString();

    const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    }


    fetch(`http://localhost:8081/pacientes/update/${matricula}`, options)
    .then(res => { res.json() })
    .then(response => {
        return response
    })

    fecharModal()

    //SetTimeout é para atualizar a página apenas depois de fechar o modal e finalizar requisição.
    let atualizarPagina = setTimeout(function(){
        document.location.reload(true)
    },500)

    atualizarPagina
}