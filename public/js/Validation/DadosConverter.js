class DadosConverter {
    constructor() {
        throw new Error("Está classe não pode ser instanciada");
    }

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