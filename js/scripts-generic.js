/* Arquivo de scripts genérico em js */

// Converte um formulário serializado em um objeto JSON
function serializeFormToJSON(serializeForm) {
    var data = serializeForm.split("&");
    var obj = {};

    for(var key in data)
    {
        obj[data[key].split("=")[0]] = data[key].split("=")[1];
    }

    return obj;
}

// Converte um formulário serializado em uma string JSON
function serializeFormToJSONString(serializeForm) {
    var obj = serializeFormToJsonObject(serializeForm);

    return JSON.stringify(obj);
}

// Converte um formulário em um objeto JSON
function formDataToJSON(formElement) {    
    var formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function(value, key) { 
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

// Converte um formulário em uma string JSON
function formDataToJSONString(formElement) {    
    var convertedJSON = formDataToJSON(formElement);

    return JSON.stringify(convertedJSON);
}