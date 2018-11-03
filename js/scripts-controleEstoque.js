/* Scripts referentes ao subsistema de controle-estoque */

function validarCamposLoginAtendente(formLoginAtendente) {
    var rgField = formLoginAtendente.elements[1]
    var numRegistroField = formLoginAtendente.elements[0];

    var isValid = true;

    // Caso não seja válido coloca a borda vermelha de incorreta
    if (!isValidRG(rgField.value)) {
        rgField.classList.add('border-danger');
        document.getElementById('rg-invalido').style.display = "inline";
        isValid = false;
    } else {
        document.getElementById('rg-invalido').style.display = "none";
        rgField.classList.remove('border-danger');
    }

    if (!isValidNumRegistro(numRegistroField.value)) {
        numRegistroField.classList.add('border-danger');
        document.getElementById('numRegistro-invalido').style.display = "inline";
        isValid = false;
    } else {
        numRegistroField.classList.remove('border-danger');
        document.getElementById('numRegistro-invalido').style.display = "none";
    }

    return isValid;
}

function sendAjaxLoginAtendente(dataJSON, urlAction) {

    $.post(urlAction, dataJSON, function (data, status) {
        if (status == "sucess") {
            console.log(data);
        }
    })
        .done(function () {
            window.location.href = "../controleEstoque/cadastro-pessoa.html";
        })
        .fail(function () {
            alert("error in backend request. Please check your code");
        })
        .always(function () {
        });
}

function isValidRG(rg) {
    // Checa pelo tamanho
    if (rg.length !== 1 && rg.length !== 3) {
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
    
    groupButtons.on('click', function(e) {
        e.preventDefault();
        
       groupButtons.removeClass('btn-primary').addClass('btn-default');
       $(this).addClass('btn-primary').removeClass('btn-default');
    });
}


    