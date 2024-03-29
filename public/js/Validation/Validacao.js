function criarLegenda(alvo, estilo) {
    let legenda = document.querySelector(`.alerta-${alvo}`)
    legenda.style.display = estilo;
}
function CancelarEnvio() {
    const botao = document.querySelector("#adicionar-paciente");
    botao.onclick = () => {
        return false;
    }
    botao.classList.add("botao-desativado");
}
function AtivarEnvio() {
    const botao = document.querySelector("#adicionar-paciente");
    botao.onclick = () => {
        return true;
    }
    botao.classList.remove("botao-desativado");
}

function validarMatricula(matricula, valor) {
    if (/^[0-9]{6}\-[0-9]$/.test(valor) || valor.length == 0) {
        matricula.classList.remove("erro");
        criarLegenda("matricula", "none");
        AtivarEnvio();
    } else if (/\d{7}/.test(valor) || /\d{8}/.test(valor)) {
        matricula.value = DadosConverter.paraMatricula(valor)
    }
    else {
        matricula.classList.add("erro");
        criarLegenda("matricula", "block");
        CancelarEnvio();
    }
}

function validarNome(nome, valor) {
    if (!/(^[A-Za-z]{1,}\s*)([A-Za-z]+\s?)*/.test(valor) && valor.length > 0) {
        nome.classList.add("erro");
        criarLegenda("nome", "block");
        CancelarEnvio();
    } else {
        nome.classList.remove("erro");
        criarLegenda("nome", "none");
        AtivarEnvio();
    }
}

function validarData(data, valor) {
    if (!/(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d{2}/.test(valor) && valor.length > 0) {
        data.classList.add("erro");
        CancelarEnvio();
    }else{
        data.classList.remove("erro");
        criarLegenda("nascimento", "none");
        AtivarEnvio();
    }
}


function validarTelefone(telefone,valor) {
    if(/^\d{10}/.test(valor)){
        telefone.value = DadosConverter.paraTel(valor)
        telefone.classList.remove("erro");
        criarLegenda("telefone","none");
        AtivarEnvio();
    }
    else if (!/^\d{2}-\d{4}-\d{4}$/.test(valor) && valor.length>0){
        telefone.classList.add("erro");
        criarLegenda("telefone","block");
        CancelarEnvio();
    }else {
        telefone.classList.remove("erro");
        criarLegenda("telefone","none");
        AtivarEnvio();
    }
}

function validarCelular(celular,valor) {
    if(/^\d{11}/.test(valor)){
        celular.value = DadosConverter.paraCel(valor);
        celular.classList.remove("erro");
        criarLegenda("celular","none");
        AtivarEnvio();
    }
    else if (!/^\d{2}\-\9\d{4}\-\d{4}$/.test(valor) && valor.length>0){
        celular.classList.add("erro");
        criarLegenda("celular","block");
        CancelarEnvio();
    }else{
        celular.classList.remove("erro");
        criarLegenda("celular","none");
        AtivarEnvio();
    }
}

function SemContato(){

    let telefone = document.querySelector('#telefone');
    let celular = document.querySelector('#celular');
    let checkCel = document.querySelector('#check-celular');
    let checkTel = document.querySelector('#check-telefone');

    if(checkTel.checked){
        telefone.value = '';
        telefone.classList.remove("erro");
        criarLegenda("telefone","none");
        AtivarEnvio();
        telefone.disabled = true;
        let caixa_checkbox = checkCel.parentNode;
        caixa_checkbox.style.display = 'none'
    }else if(checkCel.checked){
        celular.value = '';
        celular.classList.remove("erro");
        criarLegenda("celular","none");
        AtivarEnvio();
        celular.disabled = true;
        let caixa_checkbox = checkTel.parentNode;
        caixa_checkbox.style.display = 'none';
    }

    if(!checkTel.checked){
        telefone.removeAttribute('disabled');
        let caixa_checkbox = checkCel.parentNode;
        caixa_checkbox.style.display = 'flex'

    }
    if(!checkCel.checked){
        celular.removeAttribute('disabled');
        let caixa_checkbox = checkTel.parentNode;
        caixa_checkbox.style.display = 'flex'
    }
}


function limparFormBusca(){

    let matricula = document.querySelector('#matricula');
    let data = document.querySelector('#data');
    let data2 = document.querySelector('#data2');
    let nome = document.querySelector('#nome');

    let inputsForm = [matricula, data, data2, nome];

    inputsForm.forEach(input =>{
        input.value = '';
    })

    let optionStatusAguard = document.querySelector('#optionStatusAguard');
    let optionStatusSelected = document.querySelector('#optionStatusSelected');
    optionStatusSelected.selected = false;
    optionStatusAguard.selected = true;

    let statusEspecVazio = document.querySelector('#statusEspecVazio');
    let statusEspecSelected = document.querySelector('#statusEspecSelected');

    statusEspecSelected.selected = false;
    statusEspecVazio.selected = true;


}

function dataFormatada(data) {
    let mes = item => (item + 1) < 10 ? `0${item + 1}` : item + 1;
    let dia = item => item < 10 ? `0${item}` : item;
    let dataResult = [].concat(dia(data.getDate()), mes(data.getMonth()), data.getFullYear());
    return `${dataResult[0]}/${dataResult[1]}/${dataResult[2]}`
}

function horaFormatada(hora) {
    let minutos = item => item < 10 ? `0${item}` : item;
    let horaResult = [].concat(hora.getHours(), minutos(hora.getMinutes()));
    return `${horaResult[0]}:${horaResult[1]}`
}


module.exports = {dataFormatada, horaFormatada}