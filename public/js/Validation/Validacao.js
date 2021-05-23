function criarLegenda(alvo,estilo){
    let legenda = document.querySelector(`.alerta-${alvo}`)
    legenda.style.display = estilo;
}
let botaoSubmit = document.querySelector("#adicionar-paciente").disable = true;

function validarAtendente(atendente, valor){
    if(!/(^[A-Za-z]{3,}$)/.test(valor) && valor.length>0){
        atendente.classList.add("erro");
        criarLegenda("atendente","block");
    }else{
        atendente.classList.remove("erro");
        criarLegenda("atendente","none");
    }
}

function validarMatricula(matricula, valor) {
    if(/^[0-9]{6}\-[0-9]$/.test(valor) || valor.length==0){
        matricula.classList.remove("erro");
        criarLegenda("matricula","none");
    }else if(/\d{7}/.test(valor)){
       matricula.value = DadosConverter.paraMatricula(valor)
    }
    else{
        matricula.classList.add("erro");
        criarLegenda("matricula","block");
    }
}

function validarNome(nome, valor){
    if(!/(^[A-Za-z]{1,}\s*)([A-Za-z]+\s?)*/.test(valor) && valor.length>0){
        nome.classList.add("erro");
        criarLegenda("nome","block");
    }else{
        nome.classList.remove("erro");
        criarLegenda("nome","none");
    }
}

function validarData(data,valor){
    if(!/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}/.test(valor) && valor.length>0){
        data.classList.add("erro");
        criarLegenda("nascimento","block");
    }else{
        data.classList.remove("erro");
        criarLegenda("nascimento","none");
    }
}


function validarTelefone(telefone,valor) {
    if(/^\d{10}/.test(valor)){
        telefone.value = DadosConverter.paraTel(valor)
        telefone.classList.remove("erro");
        criarLegenda("telefone","none");
    }
    else if (!/^\d{2}-\d{4}-\d{4}$/.test(valor) && valor.length>0){
        telefone.classList.add("erro");
        criarLegenda("telefone","block");
    }else {
        telefone.classList.remove("erro");
        criarLegenda("telefone","none");
    }
}

function validarCelular(celular,valor) {
    if(/^\d{11}/.test(valor)){
        celular.value = DadosConverter.paraCel(valor);
        celular.classList.remove("erro");
        criarLegenda("celular","none");
    }
    else if (!/^\d{2}\-\9\d{4}\-\d{4}$/.test(valor) && valor.length>0){
        celular.classList.add("erro");
        criarLegenda("celular","block");
    }else{
        celular.classList.remove("erro");
        criarLegenda("celular","none");
    }
}
