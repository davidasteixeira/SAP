const PDFPrinter = require('pdfmake');
const { TDocumentDefinitions } = require('pdfmake');
const Pacientes = require('../models/Pacientes');
const { Op } = require("sequelize");
const { fonts } = require("../helpers/PDFMake");
let { docDefinitions, contentRelatorioPorEspecialidade,footerRelatorio } = require("../helpers/PDFMake");



exports.especialidadesStatus = (req, res) => {

    const { status, dataInicial, dataFinal } = req.query;
    const usuario = req.user;

    const especialidadesList = Pacientes.findAll({
        attributes: [
            'Especialidade'
        ],
        where: {
            [Op.and]: [
                { Status: status },
                { DataCriacao: { [Op.between]: [dataInicial, dataFinal] } }
            ]
        },
        group: 'Especialidade'
    })

    especialidadesList.then(listEspecialidades => {
        if (listEspecialidades.length <= 0) {
            req.flash('error_msg', 'Não tem dados para gerar relatório');
            res.redirect('/relatorios/report-situacao');
        } else {
            let dados = []
            let contador = 0;

            listEspecialidades.forEach(item => {
                Pacientes.count({
                    where: {
                        [Op.and]: [
                            {Especialidade: item.Especialidade},
                            { Status: status },
                            { DataCriacao: { [Op.between]: [dataInicial, dataFinal] } }
                        ]
                    }
                }).then(resultCount => {

                    contador++;
                    dados.push({ Especialidade: item.Especialidade, Total: resultCount });

                    if (contador == listEspecialidades.length) {

                        dados.sort((a,b)=>{
                            return (b.Total > a.Total) ? 1 : ((a.Total> b.Total)? -1:0)
                        });

                        const arrayComValoresDaBusca = [];
                        let somaTotal = 0;

                        dados.forEach(dado => {
                            let linhas = [];
                            
                            linhas.push(dado.Especialidade);
                            linhas.push(dado.Total);
                            somaTotal += dado.Total
                            arrayComValoresDaBusca.push(linhas);
                        })

                        const printer = new PDFPrinter(fonts);

                        docDefinitions.content = contentRelatorioPorEspecialidade(dataInicial, dataFinal, status, arrayComValoresDaBusca, somaTotal)

                        docDefinitions.footer = footerRelatorio(usuario.login)

                        const pdfDoc = printer.createPdfKitDocument(docDefinitions);

                        const chunks = [];

                        pdfDoc.on("data", (chunk) => {
                            chunks.push(chunk)
                        });

                        pdfDoc.end();

                        pdfDoc.on("end", () => {
                            const result = Buffer.concat(chunks)
                            res.end(result)
                        });

                    }
                })
                .catch((err) => {
                    req.flash('error_msg', 'Houve um erro para criar PDF, Tente novamente');
                    res.redirect('/relatorios/report-situacao');
                })

            })

        }
    })

}