function serializeFormToJson(serializeForm) {
    var data = serializeForm.split("&");
    var obj={};

    for(var key in data)
    {
        obj[data[key].split("=")[0]] = data[key].split("=")[1];
    }

    return JSON.stringify(obj);
}