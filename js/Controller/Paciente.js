class Paciente {
    constructor(atendente, matricula, nome, nascimento, telefone, celular, especialidade, observacao){
        this._atendente = atendente;
        this._matricula = matricula;
        this._nome = nome;
        this._nascimento = nascimento;
        this._telefone = telefone;
        this._celular = celular;
        this._especialidade = especialidade
        this._observacao = observacao;
        this._data = DadosConverter.dataAtual();
        Object.freeze(this);
    }
    get matricula(){
        return this._matricula;
    }
}


