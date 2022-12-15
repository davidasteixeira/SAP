const Pacientes = require('../models/Pacientes');
const {Op} = require('sequelize'); 
const {generateNameXLSX, createXLSX,removeArchive} = require('../helpers/xlsx.js');
const path = require('path');

exports.relatorioExcelEspecStatus = async (req,res) =>{

    const {status,especialidade,dataInicial,dataFinal} = req.query;

    let parametros = {};

    if(status !==null && status!==undefined && status!==''){
        parametros.Status = status;
    }

    if(especialidade !==null && especialidade!==undefined && especialidade!==''){
        parametros.Especialidade = especialidade;
    }

    await Pacientes.findAll({
        order: [
            ['id', 'ASC']
        ],
        where:{
            ...parametros,
            DataCriacao:{
                [Op.between]: [dataInicial, dataFinal]
            }
        }
    }).then(async data =>{

        const nameGenerated = await generateNameXLSX();

        let dados = []

        await data.forEach( registro => {
            dados.push(registro.dataValues);
        });

        await createXLSX(dados, nameGenerated);

        res.setHeader("Content-Type","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Dispositon","attachment; filename=" + nameGenerated);

        let pathFile = path.join(process.env.paste_save,`${nameGenerated}.xlsx`);

        res.download(pathFile,`${nameGenerated}.xlsx`, async (err)=>{
                if (err) {
                    console.log(err,'Erro no envio do arquivo');
                    req.flash('error_msg', 'Houve um erro no envio do arquivo, tente novamente');
                    res.redirect('/relatorios/report-situacao');
                } else {
                    console.log('Arquivo enviado:', nameGenerated);
                    await removeArchive(nameGenerated);
                }
        });
        
    }).catch(err =>{
        console.log(err);
        req.flash('error_msg', 'Houve um erro para buscar os dados ao gerar a planilha, tente novamente');
        res.redirect('/relatorios/report-situacao');
    });
}