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

            let btnCreate = setBtnCreate(settings.configs.title_btnCreate, settings.configs.url_create);
            if (btnCreate) {
                _el.append(btnCreate);
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
        function clickBtnCreateModalForm() {
            let btnCreate = document.getElementById('btn-create');

            if (btnCreate) {
                btnCreate.setAttribute("data-toggle", "modal");
                btnCreate.setAttribute("data-target", "modal-btnCreate");
            }

            
        }
    };
})(jQuery);