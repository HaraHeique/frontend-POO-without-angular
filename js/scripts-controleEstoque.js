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

    $.post(urlAction, dataJSON, function (data, status) {
        if (status === "success") {
            // Tanto número de registro quanto o rg são válidos checados no backend
            if ((data.numeroregistro === true) && (data.rg === true)) {
                window.location.href = "../controleEstoque/cadastro-medicamentos.html";
            }

            let rgValid = data.rg;
            let numeroregistroValid = data.numeroregistro;
            definirCamposLoginAtendente(rgValid, numeroregistroValid);
        }
    })
        .done(function () {
        })
        .fail(function () {
            alert("error in backend request. Please check your code");
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

function rederHtmlFooterShared() {
    var html = '';

    document.getElementById('footer').insertAdjacentHTML('afterbegin', html);
}

function changeColorButtonNav(btnNavClicked) {
    btnNavClicked.classList.remove('btn-default');
    btnNavClicked.classList.add('btn-primary');
    btnNavClicked.href = '#';
}

