function adicionaZero(valor) {
    return valor.toString().padStart(2, '0');
}

function formataData(data) {
    return `${data.getFullYear()}-${adicionaZero(data.getMonth() + 1)}-${adicionaZero(data.getDate())}`;
}

const inputDataInicial = document.querySelector('#dataInicial');
const inputDataFinal = document.querySelector('#dataFinal');

window.addEventListener('DOMContentLoaded', function() {

    let data = new Date(); 
    inputDataInicial.max = formataData(data);
    data.setMonth(data.getMonth() - 3);
    inputDataInicial.min = formataData(data);

});

inputDataFinal.addEventListener('click', function(){
    
    let data = new Date();
    inputDataFinal.max = formataData(data);

    if(inputDataInicial.value){
        inputDataFinal.min = inputDataInicial.value
    }else{
        data.setMonth(data.getMonth() - 3);
        inputDataFinal.min = formataData(data);
    }

})

window.addEventListener('input', () => {
  inputDataInicial.setCustomValidity('');
  inputDataInicial.checkValidity();

  inputDataFinal.setCustomValidity('');
  inputDataFinal.checkValidity();
});


window.addEventListener('invalid', () => {
    inputDataInicial.setCustomValidity('Data mínima até 3 meses');

    inputDataFinal.setCustomValidity('Data deve estar entre hoje e a data inicial');
});