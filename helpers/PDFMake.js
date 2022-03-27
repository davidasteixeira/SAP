const fonts = {
    "Helvetica":{
        normal: "Helvetica",
        bold:"Helvetica-Bold",
        italics: "Helvetica-Oblique",
        bolditalics: "Helvetica-BoldOblique",
    }
}

var docDefinitions = {
    pagesize: 'A4',
    pageOrientation:'portrait',
    defaultStyle: {font: "Helvetica"},
    pageBreakBefore: function(currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
        return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
    },
    styles: {
		header: {
			fontSize: 25,
			alignment: 'left',
		},
        table:{
            margin: [ 90, 20, 0,20],
            alignment: 'center',
        },
        tableHeaders:{
            bold:true,
            fontSize: 13,
            
        },
        footer:{
            margin: [30, 15, 30,15],
        },
    },
};

function footerRelatorio(usuario){
    
    function DataAtual() {
        let data = new Date();
    
        let mes = item => (item + 1) < 10 ? `0${item + 1}` : item + 1;
        let dia = item => item < 10 ? `0${item}` : item;
    
        let dataResult = [].concat(dia(data.getDate()), mes(data.getMonth()), data.getFullYear());
        return `${dataResult[2]}-${dataResult[1]}-${dataResult[0]}`
    }

    return {
        columns: [
          `${usuario.toUpperCase()}`,
          { text: `${DataAtual().split('-').reverse().join().replace(/[',']/g,'/')}`, alignment: 'right' },
        ],
        style:'footer',
    }
}

function contentRelatorioPorEspecialidade(dataInicial, dataFinal, Status, Dados, resultadoTotal){
    return [
        {
            image:'./public/img/sap-logo.png',
            width: 150
        },
        {
            text: "Relatório de especialidades",
            style: 'header',
        },
        '\n',
        {
			columns: [
				{
					width: 100,
					text: `De: ${(dataInicial.split('-').reverse().join().replace(/[',']/g,'/'))}`,
				},
				{
					width: 100,
					text: `Até: ${(dataFinal.split('-').reverse().join().replace(/[',']/g,'/'))}`,
				},
				{
					width: 150,
					text: `Status: ${Status}`,
				},
			]
		},
        {
            table: {
                widths: [200, 100],
                body: [
                    [{text:'Especialidade',style:'tableHeaders'}, {text:'Qtd',style:'tableHeaders'}],
                    ...Dados,
                    [{text:'Total',style:'tableHeaders'}, {text:`${resultadoTotal}`,style:'tableHeaders'}]
                ]
            },
            style: 'table',
        }
    ]
    
    
}




module.exports = {fonts, docDefinitions, contentRelatorioPorEspecialidade, footerRelatorio}