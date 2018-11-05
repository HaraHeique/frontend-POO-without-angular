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

        function setTitleBoxContent(title) {
            let html = '';
            html += '<div class="row pl-4 pt-2">';
            html += '   <h3 class="col-sm-12">' + title + '</h3>';
            html += '</div>';
            html += '<hr color="white">';

            return html;
        }

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

        function checkValidUrls(url) {
            if (url) {
                if (url.includes("http") || url.includes("https")) {
                    return true;
                }
            }

            return false;
        }
    };
})(jQuery);