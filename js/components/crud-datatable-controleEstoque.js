(function ($) {
    $.fn.crudDataTable = function (options) {
        var settings = $.extend({
            title: '',
            url: '',
            data: ''
        }, options);

        return this.each(function () {
            var _el = $(this);

            // Cria o título do container do conteúdo
            let tituloContainer = setTitleBoxContent(settings.title);
            _el.html(tituloContainer);

            let containerBtnCreate = setBtnCreate(settings.configs.title_btnCreate, settings.configs.url_create);
            if (containerBtnCreate) {
                _el.append(containerBtnCreate);
                clickBtnCreateModalForm(settings.identificador, settings.configs.title_btnCreate);
            }

            let dtContainer = createContainerDataTable();
            _el.append(dtContainer);

            let dataTable = renderInitDataTable(settings.data);
        });

        /* Cria o título do box do content */
        function setTitleBoxContent(title) {
            let html = '';
            html += '<div class="row pl-4 pt-2">';
            html += '   <h3 class="col-sm-12">' + title + '</h3>';
            html += '</div>';
            html += '<hr color="white">';

            return html;
        }

        /* Cria o botão de criação que abre o formulário para ser cadastrado */
        function setBtnCreate(btnTitle, url_create) {
            if (checkValidUrls(url_create)) {
                let html = '';
                html += '<div class="row pl-2 py-2">';
                html += '   <div class="col-sm-12">';
                html += '       <button type="button" id="btn-create" class="btn-create btn-md btn-light">' + btnTitle + '</button>';
                html += '   </div>';
                html += '</div>';

                return html;
            }
        }

        /* Checa se a url passada como parâmetro é válida */
        function checkValidUrls(url) {
            if (url) {
                if (url.includes("http") || url.includes("https")) {
                    return true;
                }
            }

            return false;
        }

        /* Dá binding no evento de click do botão btnCreate e cria o modal com o form */
        function clickBtnCreateModalForm(formIdentificador, modalTitle) {
            let btnCreate = document.getElementById('btn-create');
            let modalId = "modal-btnCreate";

            if (btnCreate) {
                btnCreate.setAttribute("data-toggle", "modal");
                btnCreate.setAttribute("data-target", "#" + modalId);
            }

            let modalForm = createModalForm(modalId, modalTitle);
            let formBody;

            switch (formIdentificador) {
                case "cadastrar-medicamentos":
                    formBody = cadastrarMedicamentosForm();
                    break;
                case "cadastrar-pacientes":
                    formBody = cadastrarPacientesForm();
                    break;
                case "solicitacao-medicamentos":
                    formBody = cadastrarSolicitacaoMedicamentosForm();
                    break;
                default:
                    alert("Identificador para criação do modal incorreta. Favor checar!");
            }

            // Insere o modal após o btn create
            btnCreate.insertAdjacentHTML("afterend", modalForm);

            // Insere o formulário dentro do corpo do modal
            document.getElementById('modal-body').insertAdjacentHTML("afterbegin", formBody);

            // Chama o método que faz o bind dos eventos de validação antes de enviar o formulário
            validationSendFormEvent("create");
            
            // Bind dos eventos de mudança do select de número de dependentes do formulário de pacientes
            addNovosDependentesEvent();
        }

        /* Criação do modal compartilhado para todos os modais forms de criação */
        function createModalForm(modalId, modalTitle) {
            let html = '';

            html += '<div class="modal fade modal-form" id="' + modalId + '" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true">';
            html += '    <div class="modal-dialog modal-dialog-centered" role="document">';
            html += '        <div class="modal-content">';
            html += '            <div class="modal-header" style="border-bottom-color: #c0c3c5 !important">';
            html += '                <h5 class="modal-title field-form" id="modal-title">' + modalTitle + '</h5>';
            html += '                <button type="button" title="Fechar" class="close close-modal" data-dismiss="modal" aria-label="Fechar">';
            html += '                    <span aria-hidden="true">&times;</span>';
            html += '                </button>';
            html += '            </div>';
            html += '            <div class="modal-body" id="modal-body"></div>';
            html += '            <div class="modal-footer" style="border-top-color: #c0c3c5 !important">';
            html += '                <button type="button" class="btn btn-secondary close-modal" data-dismiss="modal">Fechar</button>';
            html += '                <button type="button" class="btn btn-primary" id="fake-btn-submit">Cadastrar</button>';
            html += '            </div>';
            html += '        </div>';
            html += '    </div>';
            html += '</div>';

            return html;
        }

        /* Criação do formulário de cadastrar medicamentos */
        function cadastrarMedicamentosForm() {
            let html = '';

            html += '<form id="novo-medicamento" class="needs-validation form-bootstrap" novalidate>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="nome-medicamento">Nome:</label>';
            html += '        <div class="col-sm-7">';
            html += '            <input class="form-control" type="text" name="nome" id="nome-medicamento" required>';
            html += '            <div class="valid-feedback"></div>';
            html += '            <div class="invalid-feedback">Nome de medicamento inválido</div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="nome-laboratorio">Laboratório:</label>';
            html += '        <div class="col-sm-7">';
            html += '            <input class="form-control" type="text" name="laboratorio" id="nome-laboratorio" required>';
            html += '                <div class="valid-feedback"></div>';
            html += '                <div class="invalid-feedback">Nome do laboratório inválido</div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="quantidade-medicamentos">Quantidade:</label>';
            html += '        <div class="col-sm-7">';
            html += '            <input class="form-control" type="number" min="0" name="quantidade" id="quantidade-medicamentos" required>';
            html += '                 <div class="valid-feedback"></div>';
            html += '                 <div class="invalid-feedback">Quantidade inválida</div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="data-vencimento">Data de Vencimento:</label>';
            html += '        <div class="col-sm-7">';
            html += '            <div class="input-group">';
            html += '                <div class="input-group-prepend">';
            html += '                    <span class="input-group-text"><i class="fa fa-calendar" aria-hidden="true"></i></span>';
            html += '                </div>';
            html += '                <input class="form-control" type="date" name="datavencimento" id="data-vencimento" required>';
            html += '                <div class="valid-feedback"></div>';
            html += '                <div class="invalid-feedback">Data inválida</div>';
            html += '            </div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="bula-medicamento">Bula:</label>';
            html += '        <div class="col-sm-7">';
            html += '            <textarea class="form-control" rows="4" name="bula" id="bula-medicamento" placeholder="Insira as informações da bula do medicamento" required></textarea>';
            html += '            <div class="valid-feedback"></div>';
            html += '            <div class="invalid-feedback">Favor inserir as informações da bula</div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <button class="btn btn-primary" id="btn-submit-form" type="submit" style="display: none;">Submit</button>';
            html += '</form>';

            return html;
        }

        /* Criação do formulário de cadastrar pacientes */
        function cadastrarPacientesForm() {
            let html = '';

            html += '<form id="novo-paciente" class="needs-validation form-bootstrap" novalidate>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="nome-paciente">Nome:</label>';
            html += '        <div class="col-sm-7">';
            html += '            <input class="form-control" type="text" name="nome" id="nome-paciente" required>';
            html += '            <div class="valid-feedback"></div>';
            html += '            <div class="invalid-feedback">Nome de paciente inválido</div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="cpf-paciente">CPF:</label>';
            html += '        <div class="col-sm-7">';
            html += '            <input class="form-control" type="text" name="cpf" id="cpf-paciente" required>';
            html += '            <div class="valid-feedback"></div>';
            html += '            <div class="invalid-feedback">CPF inválido</div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="rg-paciente">RG:</label>';
            html += '        <div class="col-sm-7">';
            html += '            <input class="form-control" type="text" name="rg" id="rg-paciente" required>';
            html += '            <div class="valid-feedback"></div>';
            html += '            <div class="invalid-feedback">RG inválido</div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="numeroSUS-paciente">Número SUS:</label>';
            html += '        <div class="col-sm-7">';
            html += '            <input class="form-control" type="text" name="numerosus" id="numeroSUS-paciente" required>';
            html += '            <div class="valid-feedback"></div>';
            html += '            <div class="invalid-feedback">Número de SUS inválido</div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="data-nascimento">Data de Nascimento:</label>';
            html += '        <div class="col-sm-7">';
            html += '            <div class="input-group">';
            html += '                <div class="input-group-prepend">';
            html += '                    <span class="input-group-text"><i class="fa fa-calendar" aria-hidden="true"></i></span>';
            html += '                </div>';
            html += '                <input class="form-control" type="date" name="datanascimento" id="data-nascimento" required>';
            html += '                <div class="valid-feedback"></div>';
            html += '                <div class="invalid-feedback">Data inválida</div>';
            html += '            </div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="form-group form-row">';
            html += '        <div class="col-sm-5 field-form">Sexo:</div>';
            html += '        <div class="col-sm-7">';
            html += '            <div class="custom-control custom-radio custom-control-inline">';
            html += '                <input class="custom-control-input" type="radio" name="sexo" id="sexo-feminino" value="0" required>';
            html += '                <label class="custom-control-label" for="sexo-feminino" style="color: black">Feminino</label>';
            html += '            </div>';
            html += '            <div class="custom-control custom-radio custom-control-inline">';
            html += '                <input class="custom-control-input" type="radio" name="sexo" id="sexo-masculino" value="1" required>';
            html += '                <label class="custom-control-label" for="sexo-masculino" style="color: black">Masculino</label>';
            html += '            </div>';
            html += '        </div>'
            html += '    </div>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="numero-dependentes">Número de dependentes:</label>';
            html += '        <div class="col-sm-2">';
            html += '            <select class="custom-select form-control" id="numero-dependentes">';
            html += '                <option value="0" selected>0</option>';
            html += '                <option value="1">1</option>';
            html += '                <option value="2">2</option>';
            html += '                <option value="3">3</option>';
            html += '            </select>';
            html += '            <div class="valid-feedback"></div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div id="form-dependentes-pacientes" style="display:none;" name="dependentes"></div>';
            html += '    <button class="btn btn-primary" id="btn-submit-form" type="submit" style="display: none;">Submit</button>';
            html += '</form>';

            return html;
        }

        /* Criação dos formulários dos dependentes que ficam com display:none e vão aparecendo com a seleção do número de dependentes */
        function cadastrarPacientesDependentesForm(numeroMaxDependentes) {
            let html = '';
            html += '<hr style="border: 0.5px solid #c0c3c5;">'
            html += '<h4 class="my-4 field-form-dependentes" style="text-align:center;">';
            html += '    Informações dos Dependentes';
            html += '</h4>';

            for (let i = 1; i <= numeroMaxDependentes; i++) {
                let idNome = "nome-dependente-" + i;
                let idRg = "rg-dependente-" + i;
                let idDataNascimento = "data-nascimento-dependente-" + i;
                let idSexoMasc = "sexo-masculino-" + i;
                let idSexoFem = "sexo-feminino-" + i;

                html += '    <h5 class="field-form-dependentes mt-5 mb-4" style="font-size:1rem; text-align:center">Dependente ' + i + '</h5>';
                html += '    <div class="form-group form-row">';
                html += '        <label class="col-sm-5 col-form-label field-form" for="' + idNome + '">Nome:</label>';
                html += '        <div class="col-sm-7">';
                html += '            <input class="form-control" type="text" name="nome_dependente'+ i +'" id="' + idNome + '" required>';
                html += '            <div class="valid-feedback"></div>';
                html += '            <div class="invalid-feedback">Nome de dependente inválido</div>';
                html += '        </div>';
                html += '    </div>';
                html += '    <div class="form-group form-row">';
                html += '        <label class="col-sm-5 col-form-label field-form" for="' + idRg + '">RG:</label>';
                html += '        <div class="col-sm-7">';
                html += '            <input class="form-control" type="text" name="rg_dependente'+ i +'" id="' + idRg + '" required>';
                html += '            <div class="valid-feedback"></div>';
                html += '            <div class="invalid-feedback">RG inválido</div>';
                html += '        </div>';
                html += '    </div>';
                html += '    <div class="form-group form-row">';
                html += '        <label class="col-sm-5 col-form-label field-form" for="' + idDataNascimento + '">Data de Nascimento:</label>';
                html += '        <div class="col-sm-7">';
                html += '            <div class="input-group">';
                html += '                <div class="input-group-prepend">';
                html += '                    <span class="input-group-text"><i class="fa fa-calendar" aria-hidden="true"></i></span>';
                html += '                </div>';
                html += '                <input class="form-control" type="date" name="datanascimento_dependente'+ i +'" id="' + idDataNascimento + '" required>';
                html += '                <div class="valid-feedback"></div>';
                html += '                <div class="invalid-feedback">Data inválida</div>';
                html += '            </div>';
                html += '        </div>';
                html += '    </div>';
                html += '    <div class="form-group form-row">';
                html += '        <div class="col-sm-5 field-form">Sexo:</div>';
                html += '        <div class="col-sm-7">';
                html += '            <div class="custom-control custom-radio custom-control-inline">';
                html += '                <input class="custom-control-input" type="radio" name="sexo_dependente'+ i +'" id="' + idSexoFem + '" value="0" required>';
                html += '                <label class="custom-control-label" for="' + idSexoFem + '" style="color: black">Feminino</label>';
                html += '            </div>';
                html += '            <div class="custom-control custom-radio custom-control-inline">';
                html += '                <input class="custom-control-input" type="radio" name="sexo_dependente'+ i +'" id="' + idSexoMasc + '" value="1" required>';
                html += '                <label class="custom-control-label" for="' + idSexoMasc + '" style="color: black">Masculino</label>';
                html += '            </div>';
                html += '        </div>'
                html += '    </div>';
            }

            return html;
        }

        /* Criação do formulário de cadastrar solitação de medicamentos */
        function cadastrarSolicitacaoMedicamentosForm() {
            let html = '';

            html += '<form id="nova-solicitacao-medicamento" class="needs-validation form-bootstrap" novalidate>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="nome-medicamento">Nome:</label>';
            html += '        <div class="col-sm-7">';
            html += '            <input class="form-control" type="text" name="nome" id="nome-medicamento" required>';
            html += '            <div class="valid-feedback"></div>';
            html += '            <div class="invalid-feedback">Nome de medicamento inválido</div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="nome-laboratorio">Laboratório:</label>';
            html += '        <div class="col-sm-7">';
            html += '            <input class="form-control" type="text" name="laboratorio" id="nome-laboratorio" required>';
            html += '            <div class="valid-feedback"></div>';
            html += '            <div class="invalid-feedback">Nome do laboratório inválido</div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <div class="form-group form-row">';
            html += '        <label class="col-sm-5 col-form-label field-form" for="quantidade-medicamentos">Quantidade:</label>';
            html += '        <div class="col-sm-7">';
            html += '            <input class="form-control" type="number" min="0" name="quantidade" id="quantidade-medicamentos" required>';
            html += '            <div class="valid-feedback"></div>';
            html += '            <div class="invalid-feedback">Quantidade inválida</div>';
            html += '        </div>';
            html += '    </div>';
            html += '    <button class="btn btn-primary" id="btn-submit-form" type="submit" style="display: none;">Submit</button>';
            html += '</form>';

            return html;
        }

        /* Dá binding no evento de criar novos dependentes */
        function addNovosDependentesEvent() {
            let selectNumDependentes = document.getElementById('numero-dependentes');

            if (selectNumDependentes) {
                selectNumDependentes.addEventListener('change', function (e) {
                    e.preventDefault();
    
                    let formDependentes = document.getElementById('form-dependentes-pacientes');
    
                    // Removendo todo o conteúdo dentro do formDependentes
                    while (formDependentes.firstChild) {
                        formDependentes.removeChild(formDependentes.firstChild);
                    }
    
                    // Adicionando o conteúdo novamente de acordo com a troca
                    let numDependentes = selectNumDependentes.value
                    if (numDependentes > 0) {
                        formDependentes.insertAdjacentHTML("afterbegin", cadastrarPacientesDependentesForm(numDependentes));
                        formDependentes.style.display = "block";
                    } else {
                        formDependentes.style.display = "none";
                    }
                });
            }
        }

        /* Validação do formulário de create */
        function validationSendFormEvent(operationType) {
            (function () {
                'use strict';

                // Cria o evento de click do botão fake de submit que quando clickado também é clickado o botão de submit do cadastro
                document.getElementById("fake-btn-submit").addEventListener('click', function (e) {
                    e.preventDefault();
                    document.getElementById("btn-submit-form").click();
                });

                window.addEventListener('load', function () {
                    var forms = document.getElementsByClassName('needs-validation');

                    // Loop no formulário para previnir a submissão do formulário
                    var validation = Array.prototype.filter.call(forms, function (form) {
                        form.addEventListener('submit', function (event) {
                            event.preventDefault();

                            if (form.checkValidity() === false) {
                                event.stopPropagation();
                                
                                // Classe que valida os campos do formulário mostrando mensagens
                                form.classList.add('was-validated');
                            }
                            // Quando o formulário é válido é feito create/update
                            else {
                                if (operationType === "create") {
                                    handlerCreate(form);
                                }
                                else if (operationType === "update") {

                                }
                                // Fecha o formulário
                                document.getElementsByClassName('close-modal')[0].click();

                                // Retira as informações do formulário
                                form.reset();

                                // Tira as marcações dos campo após mandar o formulário para o backend
                                form.classList.remove('was-validated');
                            }

                        }, false);
                    });
                }, false);
            })();
        }

        /* Envia o form em de create em formato JSON para o backend */
        function handlerCreate(form) {
            let dataJson = formToSimpleJSONObj(form);

            // Caso o envio do form seja de cadastrar pacientes precisa de sofrer alterações no JSON de envio
            if (settings.identificador === "cadastrar-pacientes") {
                dataJson = JSONObjCadastrarMedicamentos(dataJson);
            }

            showToast("create-success");
            
            // Enviando ao servidor via AJAX
            // $.post(settings.configs.url_create, dataJSON, function (data, status) {
            //     if (status === "success") {
            //         showToast("create-success");     
            //     }
            // })
            // .done(function () {
            // })
            // .fail(function () {
            //     showToast("create-error");
            // });
        }
        
        /* Converte o formulário para um simples JSON obj sem estruturas complexas */
        function formToSimpleJSONObj(form) {
            let formData = new FormData(form);
            let convertedJSON = {};

            formData.forEach(function(value, key) { 
                convertedJSON[key] = value;
            });

            return convertedJSON;
        }

        /* Função que pega um JSON obj simples e converte em uma estrutura mais complexa de cadastrar medicamentos */
        function JSONObjCadastrarMedicamentos(dataJson) {
            let numDependentes = document.getElementById('numero-dependentes').value;

            let objPessoa = {
                nome: dataJson.nome,
                cpf: dataJson.cpf,
                rg: dataJson.rg,
                datanascimento: dataJson.datanascimento,
                numerosus: dataJson.numerosus,
                sexo: dataJson.sexo,
                dependentes: []
            }

            for (let i = 1; i <= numDependentes; i++) {
                objPessoa.dependentes.push({
                    nome: dataJson["nome_dependente" + i],
                    rg: dataJson["rg_dependente" + i],
                    datanascimento: dataJson["datanascimento_dependente" + i],
                    sexo: dataJson["sexo_dependente" + i]
                });
            }
            
            return objPessoa;
        }

        /* Modificando o nome da variável global mostra o toast correto */
        function showToast(toastType) {
            
            // Definição das opções
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-bottom-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            
            // Mostra o toast na tela
            switch (toastType) {
                case "create-success":
                    toastr["success"]("Cadastrado com sucesso!");
                    break;
                case "create-error":
                    toastr["error"]("Houve problema no cadastro");
                    break;
                default:
            }
        }

        /* Criando a html/esqueleto da dataTable */
        function createContainerDataTable() {
            let html = '';
            html += '<div class="dt-bootstrap mt-3 mb-1 mx-2">';
            html += '    <table id="crud-dataTable" class="table table-bordered table-hover" width="100%">';
            html += '    </table>';
            html += '</div>';

            return html;
        }

        /* Renderizando a datatable no seu estado inicial */
        function renderInitDataTable(infoTable) {
            
            // Setando configurações
            let configs = {
                data: infoTable.dataSet,
                columns: infoTable.headers,
                //columnDefs: infoTable.columnDefs,
                paging: true,
                pageLength: 10,
                fixedHeader: false,
                orderClasses: false,
                autoWidth: true,
                info: false,
                scrollCollapse: false,
                scrollX: true,
                bLengthChange: false,
                order: [
                    [0, "asc"]
                ],
                language: {
                    "search": '<i class="fa fa-search" style="color: white;"></i>',
                    "searchPlaceholder": "Pesquisar...",
                    "sZeroRecords": "Nenhum registro encontrado",
                    "oPaginate": {
                        "sNext": "Próximo",
                        "sPrevious": "Anterior",
                        "sFirst": "Primeiro",
                        "sLast": "Último"
                    },
                }
            }

            // Redenrizando a dataTable
            let dataTable = $('#crud-dataTable').DataTable(configs);

            return dataTable;
        }

    };
})(jQuery);