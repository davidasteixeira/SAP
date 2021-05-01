class Pacientes{
    constructor(){
        this._pacientes = [];
    }

    adiciona(paciente){
        this._pacientes.push(paciente);
    }

    paraArray(){
        return [].concat(this._pacientes);
    }
}