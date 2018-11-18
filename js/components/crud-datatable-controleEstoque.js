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
                html += '<div class="row pl-2 pt-2">';
                html += '   <div class="col-sm-12">'
                html += '       <button type="button" id="btn-create" class="btn-create btn-md btn-light">' + btnTitle + '</button>';
                html += '   </div>'
                html += '</div>'

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
            validationSendFormCreateEvent();
        }

        /* Criação do modal compartilhado para todos os modais forms de criação */
        function createModalForm(modalId, modalTitle) {
            let html = '';

            html += '<div class="modal fade" id="' + modalId + '" tabindex="-1" role="dialog" aria-labelledby="modal-title" aria-hidden="true">';
            html += '    <div class="modal-dialog modal-dialog-centered" role="document">';
            html += '        <div class="modal-content">';
            html += '            <div class="modal-header" style="border-bottom-color: #c0c3c5 !important">';
            html += '                <h5 class="modal-title field-form" id="modal-title">' + modalTitle + '</h5>';
            html += '                <button type="button" title="Fechar" class="close" data-dismiss="modal" aria-label="Fechar">';
            html += '                    <span aria-hidden="true">&times;</span>';
            html += '                </button>';
            html += '            </div>';
            html += '            <div class="modal-body" id="modal-body"></div>';
            html += '            <div class="modal-footer" style="border-top-color: #c0c3c5 !important">';
            html += '                <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>';
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
            html += '                <input class="custom-control-input" type="radio" name="sexo" id="sexo-feminino" value="feminino" required>';
            html += '                <label class="custom-control-label" for="sexo-feminino" style="color: black">Feminino</label>';
            html += '            </div>';
            html += '            <div class="custom-control custom-radio custom-control-inline">';
            html += '                <input class="custom-control-input" type="radio" name="sexo" id="sexo-masculino" value="masculino" required>';
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
            html += '    <button class="btn btn-primary" id="btn-submit-form" type="submit" style="display: none;">Submit</button>';
            html += '</form>';

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

            selectNumDependentes.addEventListener('change', function (e) {
                e.preventDefault();
            });
        }

        /* Validação do formulário de create */
        function validationSendFormCreateEvent() {
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
                            if (form.checkValidity() === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                            form.classList.add('was-validated');
                        }, false);
                    });
                }, false);
            })();
        }
    };
})(jQuery);