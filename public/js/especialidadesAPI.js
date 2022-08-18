var campoStatus = document.querySelector('#status');

function getStatus(){

    if(campoStatus.value==''){
        return null;
    }else{
        return campoStatus.value;
    }
}


function showEspecialidades(dados){
    let campoSelect = document.querySelector("#especialidade");

    let output = '<option id="statusEspecVazio"></option>';

    if(dados.length>0){
        dados.forEach(itemEspeci => {
            output += `<option>${itemEspeci.Especialidade}</option>`
        });
    }

    campoSelect.innerHTML= output;
    
}

async function getEspecialidades(){
    try{
        let status = getStatus();
        var response = ''

        if(status==null){
            response = await fetch(`http://localhost:8086/pacientes/especialidades/aguardando`);
        }else{
            response = await fetch(`http://localhost:8086/pacientes/especialidades/${status}`);
        }

        const data = await response.json();
        showEspecialidades(data);

    }catch (error) {
        console.log('Ocorreu um error',error)
    }
}


campoStatus.addEventListener('change',()=>{
    getEspecialidades();
})