/* Scripts referentes ao subsistema de controle-estoque */

function validarCamposLoginAtendente(formLoginAtendente) {
    var rgField = formLoginAtendente.elements[1]
    var numRegistroField = formLoginAtendente.elements[0];

    let isValidRg = (isValidRG(rgField.value)) ? true : false;
    let isValidNumeroRegistro = (isValidNumRegistro(numRegistroField.value)) ? true : false;

    definirCamposLoginAtendente(isValidRg, isValidNumeroRegistro);

    return (isValidRg && isValidNumeroRegistro);
}

function sendAjaxLoginAtendente(dataJSON, urlAction) {
    showLoadingScreen("Entrando");
    
    $.post(urlAction, dataJSON, function (data, status) {
        if (status === "success") {
            if ((data.numeroregistro === true) && (data.rg === true)) {
                window.location.href = "../controleEstoque/cadastro-medicamentos.html";
            }
    
            let rgValid = data.rg;
            let numeroregistroValid = data.numeroregistro;
            definirCamposLoginAtendente(rgValid, numeroregistroValid);    
        }
    })
    .fail(function () {
        alert("error in backend request. Please check your code");
    })
    .done(function (data) {
        hideLoadingScreen();
    });
}

function definirCamposLoginAtendente(isRgValid, isNumRegistroValid) {
    if (!isRgValid) {
        document.getElementById('rg').classList.add('border-danger');
        document.getElementById('rg-invalido').style.display = "inline";
    } else {
        document.getElementById('rg').classList.remove('border-danger');
        document.getElementById('rg-invalido').style.display = "none";
    }

    if (!isNumRegistroValid) {
        document.getElementById('numRegistro').classList.add('border-danger');
        document.getElementById('numRegistro-invalido').style.display = "inline";
    } else {
        document.getElementById('numRegistro').classList.remove('border-danger');
        document.getElementById('numRegistro-invalido').style.display = "none";
    }
}

function isValidRG(rg) {
    // Checa pelo tamanho
    if (rg.length > 3) {
        return false;
    }

    // Checa se todos digítos são decimais
    if (!(/^\d+$/.test(rg))) {
        return false;
    }

    return true;
}

function isValidNumRegistro(numRegistro) {
    // Checa pelo tamanho
    if (numRegistro.length !== 1) {
        return false;
    }

    // Checa se todos digítos são decimais
    if (!(/^\d+$/.test(numRegistro))) {
        return false;
    }

    return true;
}

// Faz com que o grupo de botões de navegação seja responsivo com o resize da tela
function groupNavButtonsResponsive(groupButtons) {

    // Faz o bind para ambos eventos. Tanto no load quanto no rezise da página
    ['load', 'resize'].forEach(function (event) {
        window.addEventListener(event, function (e) {
            e.preventDefault();

            let btnGroup1 = groupButtons[0];
            let btnGroup2 = groupButtons[1];

            // this é a window
            // Todas remoções e adds são de classes do bootstrap
            if (this.screen.width >= 750) {
                btnGroup1.classList.remove('btn-group-vertical');

                btnGroup2.classList.remove('btn-group-vertical')
                btnGroup2.classList.remove('col-sm-12');
                btnGroup2.classList.add('offset-sm-1')
                btnGroup2.classList.add('col-sm-11');
            } else {
                btnGroup1.classList.add('btn-group-vertical');

                btnGroup2.classList.add('btn-group-vertical')
                btnGroup2.classList.add('col-sm-12');
                btnGroup2.classList.remove('offset-sm-1')
                btnGroup2.classList.remove('col-sm-11');
            }
        });
    });
}

// Quando botões são clicados mudam de cor
function clickedButtonNavEvent(groupButtons) {

    groupButtons.on('click', function (e) {
        e.preventDefault();

        groupButtons.removeClass('btn-primary').addClass('btn-default');
        $(this).addClass('btn-primary').removeClass('btn-default');
    });
}

function renderHtmlHeaderShared() {
    var html = '';

    html += '<div class="sign-out">';
    html += '   <a href="index.html">';
    html += '       <i title="Logout" class="fa fa-sign-out" aria-hidden="true"></i>';
    html += '   </a>';
    html += '</div>';

    document.getElementById('header').insertAdjacentHTML('afterbegin', html);
}

function renderHtmlNavShared() {
    var html = '';

    html += '<nav>';
    html += '   <div class="container-fluid">';
    html += '       <div class="row">';
    html += '           <div class="btn-group btn-navigation col-sm-12 mb-1" role="group">';
    html += '               <a href="cadastro-medicamentos.html" class="btn btn-default">Cadastrar Medicamentos</a>';
    html += '               <a href="cadastro-pacientes.html" class="btn btn-default">Cadastrar Pacientes</a>';
    html += '               <a href="retirar-medicamentos.html" class="btn btn-default">Retirar Medicamentos Solicitados</a>';
    html += '           </div>';
    html += '       </div>';
    html += '       <div class="row">';
    html += '           <div class="btn-group btn-navigation offset-sm-1 col-sm-11" role="group">';
    html += '               <a href="solicitacao-medicamentos.html" class="btn btn-default">Solicitação de Medicamentos</a>';
    html += '               <a href="recebimento-medicamentos.html" class="btn btn-default">Recebimento de Medicamentos</a>';
    html += '               <a href="gerar-relatorios.html" class="btn btn-default">Gerar Relatórios</a>';
    html += '           </div>';
    html += '       </div>';
    html += '   </div>';
    html += '</nav>';

    document.getElementById('navigation').insertAdjacentHTML('afterbegin', html);
}

function renderHtmlFooterShared() {
    var html = '';

    document.getElementById('footer').insertAdjacentHTML('afterbegin', html);
}

/* Muda a cor do botão de navegação */
function changeColorButtonNav(btnNavClicked) {
    btnNavClicked.classList.remove('btn-default');
    btnNavClicked.classList.add('btn-primary');
    btnNavClicked.href = '#';
}

function fieldsFormCadastro(nomeCadastro) {
    let fieldsForm = null;

    switch(nomeCadastro) {
        case "cadastrar-medicamentos":
            $.getJSON("./json/formfields-cadastrar-medicamentos.json", function(data) {
                console.log(data);
                fieldsForm = data;
            });
            break;
        case "cadastrar-pacientes":
            alert("I didnt do yet!");
            break;
        case "cadastrar-solicitacao":
            alert("I didnt do yet!");
            break;
        default:
            alert("Chamada de nome de cadastro não existente!");
    }

    return fieldsForm;
}

/* Cria a estrutura do header e dados da datatable de medicamento */
function structureDataTableMedicamento(data) {
    let dataStructured = {};

    // Colunas da datatable
    let headers = [
        { title: "Nome" },
        { title: "Data de Vencimento" },
        { title: "Quantidade" },
        { title: "Laboratório" },
        { title: "Operações" }
    ];

    // Dados da datatable
    let dataSet = [];

    // Botões de Operações(Consultar, Alterar e Deletar)
    let read = '<i class="fa fa-search-plus" title="Consultar Medicamento" aria-hidden="true"></i>';
    let update = '<i class="fa fa-cog" title="Atualizar Medicamento" aria-hidden="true"></i>';
    let deletee = '<i class="fa fa-trash" title="Deletar Medicamento" aria-hidden="true"></i>';

    for (indiceObj in data) {
        // Tratando o laboratório
        let laboratorio = (data[indiceObj].medicamento.laboratorio[0]);
        let laboratorio_nome = laboratorio ? laboratorio.nome : "Labs";

        dataSet.push([
            data[indiceObj].medicamento.nome,
            formatJSONToBrDate(data[indiceObj].datavencimento),
            data[indiceObj].quantidade,
            laboratorio_nome,
            '<div class="fa-operacoes">' + read + update + deletee + '</div>'
        ]);
    }

    dataStructured.headers = headers;
    dataStructured.dataSet = dataSet;
    
    return dataStructured;    
}

/* Formatar data para o padrão brasileiro */
function formatJSONToBrDate(dbJsonDateTime) {
    let dateTime = new Date(dbJsonDateTime);
    let localDateString = dateTime.toLocaleDateString();
    
    return localDateString;
}

/* Mostra o loading na tela */
function showLoadingScreen(msgLoading) {
    let html = '';

    html += '<div class="overlay-loading" id="overlay-loading-screen">';
    html += '    <div class="overlay-centered">';
    html += '        <img src="./../../img/loading-2.gif" alt="Loading login">';
    html += '        <p>' + msgLoading + '</p>';
    html += '    </div>';
    html += '</div>';

    document.body.insertAdjacentHTML('afterbegin', html);

    // Tira o scroll da tela
    document.body.style.overflow = "hidden";
}

/* Esconde o loading na tela */
function hideLoadingScreen() {
    let loadingScreen = document.getElementById('overlay-loading-screen');

    // Caso exista o overlay-loading o remove da tela
    if (loadingScreen) {
        loadingScreen.remove();
    }

    // Coloca o scroll da tela
    document.body.style.overflow = "auto";
}