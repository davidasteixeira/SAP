/*class PacienteController {
    constructor(){
        let $ = document.querySelector.bind(document)

        this._inputAtendente = $('#atendente');
        this._inputMatricula = $('#matricula');
        this._inputNome = $('#nome');
        this._inputNascimento = $('#nascimento');
        this._inputTelefone = $('#telefone');
        this._inputCelular = $('#celular');
        this._inputEspecialidade = $('#especialidade');
        this._inputObservacao = $('#observacao');
        this._pacientes = new Pacientes();
    }

    adiciona(){
        //event.preventDefault();
        this._pacientes.adiciona(this._criarPaciente());
        //this._limparFormulario();
        console.log(this._pacientes.paraArray())
    }

    _criarPaciente(){
        return new Paciente(this._inputAtendente.value,DadosConverter.paraMatricula(this._inputMatricula.value),
            this._inputNome.value,
            DadosConverter.paraData(this._inputNascimento.value),
            DadosConverter.paraTel(this._inputTelefone.value),
            DadosConverter.paraCel(this._inputCelular.value),
            this._inputEspecialidade.value,
            this._inputObservacao.value);
    }

    _limparFormulario(){
        this._inputAtendente.value = '';
        this._inputMatricula.value = '';
        this._inputNome.value = '';
        this._inputNascimento.value = '';
        this._inputTelefone.value = '';
        this._inputCelular.value = '';
        this._inputObservacao.value= 'SEM AGENDA TESTE'
    }
}*/