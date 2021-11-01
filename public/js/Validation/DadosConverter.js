class DadosConverter {
    constructor() {
        throw new Error("Está classe não pode ser instanciada");
    }
    
    /*Não vao ser utlizados no momento
    static dataAtual() {
        let now = new Date();
        let mes = item => (item + 1) < 10 ? `0${item + 1}` : item + 1;
        let data = [].concat(now.getDate(), mes(now.getMonth()), now.getFullYear());
        return `${data[0]}/${data[1]}/${data[2]}`
    }

    static paraData(data) {
        if (/^\d{2}\/\d{2}\/\d{4}/.test(data)) {
            return data;
        } else {
            let novaData = data.split(/\-/).reverse();

            return novaData.toString().replace(/[,]/gi, '/');
        }
    }*/

    static paraMatricula(matricula) {
        var resultado = matricula.split("");
        if (resultado.length == 7) {
            resultado.splice(6, 0, "-");
            return resultado.toString().replace(/[,]/g, '');
        }else{
            if(resultado.length == 8);
            resultado.splice(6, 1, "-");
            return resultado.toString().replace(/[,]/g, '');
        }

    }

    static paraTel(telefone) {
        if(/^\d{10}/.test(telefone)){
            var resultado = telefone.split("");
            resultado.splice(2, 0, "-");
            resultado.splice(7, 0, "-");
            return resultado.toString().replace(/[,]/g, '');
        }
    }
    static paraCel(celular) {
        var resultado = celular.split("");
        resultado.splice(2, 0, "-");
        resultado.splice(8, 0, "-");
        return resultado.toString().replace(/[,]/g, '');
    }
}