
function pacienteCheckbox(){
    let checkAll = document.querySelector("#checkAll");

    if(checkAll.checked){
        let checkboxs = document.querySelectorAll("#checkboxRegistro");
        
        checkboxs.forEach(check => {
            check.checked = true;
        });
    }else{
        let checkboxs = document.querySelectorAll("#checkboxRegistro");
        
        checkboxs.forEach(check => {
            check.checked = false;
        })
    }
    
}

function TratarPaciente(){
    let checkboxs = document.querySelectorAll('input[type="checkbox"]:not([id=checkAll])');

    let pacientesId = [];

    checkboxs.forEach(item =>{
        if(item.checked){
            pacientesId.push(item.value)
        }
    })

    return pacientesId;
}


const abrirModal = ()=>{
    let modal = document.querySelector('#modalRegistro');
    let matricula = document.querySelector('#matriculaRegistro');

    modal.style.display = 'block'
    matricula.value = TratarPaciente().join();
}

const fecharModal = ()=>{
    let modal = document.querySelector('#modalRegistro');
    

    modal.style.display = 'none'

    
} 