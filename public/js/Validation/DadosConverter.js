class DadosConverter {
    constructor() {
        throw new Error("Está classe não pode ser instanciada");
    }
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
    }

    static paraMatricula(matricula) {
        var resultado = matricula.split("");
        if (/^\d{6}\-\d$/.test(matricula))
            return matricula;
        else if (/\d{7}/.test(matricula) && (resultado.length == 7)) {
            resultado.splice(6, 0, "-");
            return resultado.toString().replace(/[,]/g, '');
        } else
            throw new Error("Deve ter formato 000000-0 ou 7 dígitos 0000000");

    }

    static paraTel(telefone) {
        if (!/^\d{2}-\d{4}-\d{4}$/.test(telefone))
            throw new Error('Deve estar no formato DD-0000-0000');

        return telefone;
    }
    static paraCel(celular) {
        if (!/^\d{2}\-\d{5}\-\d{4}$/.test(celular))
            throw new Error('Deve estar no formato DD-00000-0000');

        return celular;
    }
}