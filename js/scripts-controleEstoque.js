/* Scripts referentes ao subsistema de controle-estoque */

function validarCamposLoginAtendente(formLoginAtendente) {
    var rgField = formLoginAtendente.elements[1]
    var numRegistroField = formLoginAtendente.elements[0];
    var isValid = true;

    // Caso não seja válido coloca a borda vermelha de incorreta
    if (!isValidRG(rgField.value)) {
        rgField.classList.add('invalid-field');
        isValid = false;
    } else {
        rgField.classList.remove('invalid-field');
    }

    if (!isValidNumRegistro(numRegistroField.value)) {
        numRegistroField.classList.add('invalid-field');
        isValid = false;
    } else {
        numRegistroField.classList.remove('invalid-field');
    }

    return isValid;
}

function sendAjaxLoginAtendente(formLoginAtendente) {
    var formDataJSON = serializeFormToJson(formLoginAtendente.serialize());
    var urlActionResult = formLoginAtendente.attr("action");

    $.post(urlActionResult, formDataJSON, function(data, status) {
        if (status == "sucess") {
            console.log(data);
        }
    })
        .done(function () {
            // TODO redireciona para a página de cadastro: window.location.href
        })
        .fail(function () {
            alert("error in backend request. Please check your code");
        })
        .always(function () {
        });
}

function isValidRG(rg) {
    // Checa pelo tamanho
    if (rg.length !== 9 && rg.length !== 10) {
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
    if (numRegistro.length !== 6) {
        return false;
    }

    // Checa se todos digítos são decimais
    if (!(/^\d+$/.test(numRegistro))) {
        return false;
    }

    return true;
}