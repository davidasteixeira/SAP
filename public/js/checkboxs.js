
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