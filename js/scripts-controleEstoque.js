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

function sendAjaxLoginAtendente(formLoginAtendente) {
    var formDataJSON = serializeFormToJson(formLoginAtendente.serialize());
    var urlActionResult = formLoginAtendente.attr("action");

    $.post(urlActionResult, formDataJSON, function(data, status) {
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