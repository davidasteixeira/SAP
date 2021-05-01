function mascaraMatricula(campo, valor) {
    let mymatricula = '';
    mymatricula += valor;
    if (mymatricula.length == 6)
        mymatricula += "-"
        campo.value = mymatricula;
}

function mascaraData(campo, valor){
    let mydata = '';
    mydata += valor;
    if (mydata.length == 2){
      mydata += '/';
      campo.value = mydata;
    }
    if (mydata.length == 5){
      mydata += '/';
      campo.value = mydata;
    }
}

function mascaraTelefone(campo,valor){
    let mytel = '';
    mytel += valor;
    if(mytel.length == 2){
        mytel += '-';
        campo.value = mytel;
    }
    if(mytel.length == 7){
        mytel += '-';
        campo.value = mytel;
    }
}

function mascaraCelular(campo,valor){
    let mycel = '';
    mycel += valor;
    if(mycel.length == 2){
        mycel += '-';
        campo.value = mycel;
    }
    if(mycel.length == 8){
        mycel += '-';
        campo.value = mycel;
    }
}