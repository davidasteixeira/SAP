
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
    let formularioRegistro = document.querySelector('#formRegistro');

    modal.style.display = 'block'
    let pacientesString = TratarPaciente().join();
    matricula.value = pacientesString;

    formularioRegistro.setAttribute("action", `/pacientes/update/${pacientesString}`);


}

const fecharModal = ()=>{
    let modal = document.querySelector('#modalRegistro');
    

    modal.style.display = 'none'

} 