(function ($) {
    $.fn.gerarRelatorios = function (options) {
        var settings = $.extend({
            title: '',
            url: '',
            data: '',
            tipo_grafico: 'column'
        }, options);

        var widthContainerGraph;

        return this.each(function () {
            var _el = $(this);
            var infoGraficos = settings.graficos;

            // Cria o título do container do conteúdo e coloca no html
            let tituloContainer = setTitleBoxContent(settings.title);
            _el.html(tituloContainer);

            // Cria o select options para a seleção do tipo de relatório desejado
            let selectRelatorios = setSelectOptionsRelatorios(settings.configs.options_titles);
            _el.append(selectRelatorios);

            // Cria o container que será plotado o gráfico
            let graphContainer = setContainerGraph();
            _el.append(graphContainer);

            // Gera o gráfico passando as suas informações
            gerarGraficoColuna(infoGraficos);

            // Faz binding no evento de recriação do gráfico caso mude o select do relatório
            changeGeracaoGraficoEvent(infoGraficos);
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
        function setSelectOptionsRelatorios(optionsNames) {

            // Criando o select com suas opções
            let select = '';
            select += '<select class="custom-select form-control" id="selecionar-relatorio">';
            for (indiceOptions in optionsNames) {
                select += '<option value="' + indiceOptions + '">' + optionsNames[indiceOptions] + '</option>';
            }
            select += '</select>';

            let html = '';
            html += '<div class="row pr-2 py-2">';
            html += '   <div class="col-sm-12">';
            html +=         select;
            html += '   </div>';
            html += '</div>';

            return html;
        }

        /* Cria o container onde o gráfico será plotado */
        function setContainerGraph() {
            let html = '';
            html += '<div class="graph-highchart mt-3 mb-1 mx-2">';
            html += '    <div id="grafico-relatorios"></div>';
            html += '</div>';

            return html;
        }

        /* Dá binding no evento que muda a geração do gráfico de acordo com a seleção do select options */
        function changeGeracaoGraficoEvent(infoGraficos) {
            let selectRelatorios = document.getElementById('selecionar-relatorio');
            
            selectRelatorios.addEventListener('change', function(e) {
                e.preventDefault();

                // Pega o atual scroll vertical da página
                let actualScroll = window.scrollY;

                // Gera o gráfico novamente de acordo com a mudança do select
                // Par ele gera coluna e ímpar gera em pizza
                if (Number(selectRelatorios.value)%2 === 0) {
                    gerarGraficoColuna(infoGraficos);
                } else {
                    gerarGraficoPizza(infoGraficos);
                }

                // Rola a página sem efeitos para o estado que estava anteriormente evitando que vá para início da página
                window.scrollTo(0, actualScroll);
            });
        }

        // Gera o gráfico de acordo com o select feito pelo usuário do tipo coluna
        function gerarGraficoColuna(infoGraficos) {

            // Pega o select para pegar seu value e acessar no array as informações dos dados do gráfico a ser plotado
            let selectRelatorios = document.getElementById('selecionar-relatorio');
            let infoGraph = infoGraficos.data[selectRelatorios.value];

            // Pega a largura/width do container que fica plotado o gráfico
            // OBS.: O -15 é dos 15px da row que está entrando em conflito
            if (!widthContainerGraph) {
                widthContainerGraph = document.getElementById("grafico-relatorios").offsetWidth - 15;
            }

            var graficoRelatorio = Highcharts.chart('grafico-relatorios', {
                chart: {
                    type: 'column',
                    //width: widthContainerGraph
                },
                title: {
                    text: infoGraph.title
                },
                subtitle: {
                    text: infoGraph.subtitle
                },
                xAxis: {
                    categories: infoGraph.categories,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Quantidade(unit)'
                    }
                },
                series: [{
                    name: 'Quantidade',
                    data: infoGraph.data_series
                }],
                tooltip: {
                },
                plotOptions: {
                    column: {
                        pointPadding: 0,
                        borderWidth: 0
                    }
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: true
                },
                legend: {
                    enabled: false
                }
            });
        }

        // Gera o gráfico de acordo com o select feito pelo usuário do tipo pizza
        function gerarGraficoPizza(infoGraficos) {

            // Pega o select para pegar seu value e acessar no array as informações dos dados do gráfico a ser plotado
            let selectRelatorios = document.getElementById('selecionar-relatorio');
            let infoGraph = infoGraficos.data[selectRelatorios.value];

            // Pega a largura/width do container que fica plotado o gráfico
            // OBS.: O -15 é dos 15px da row que está entrando em conflito
            if (!widthContainerGraph) {
                widthContainerGraph = document.getElementById("grafico-relatorios").offsetWidth - 15;
            }

            var graficoRelatorio = Highcharts.chart('grafico-relatorios', {
                chart: {
                    type: 'pie',
                    //width: widthContainerGraph
                },
                title: {
                    text: infoGraph.title
                },
                subtitle: {
                    text: infoGraph.subtitle
                },
                xAxis: {
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Quantidade(unit)'
                    }
                },
                series: [{
                    name: 'Quantidade',
                    data: structureDataPizzaChart(infoGraph)
                }],
                tooltip: {
                },
                plotOptions: {
                    column: {
                        pointPadding: 0,
                        borderWidth: 0
                    }
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: true
                },
                legend: {
                    enabled: false
                }
            });
        }

        /* Estruturar a informação do campo data corretamente para gerar o gráfico do tipo pizza */
        function structureDataPizzaChart(dataChart) {
            let dataStructered = [];

            if (dataChart) {
                for (indice in dataChart.categories) {
                    dataStructered.push({
                        name: dataChart.categories[indice],
                        y: dataChart.data_series[indice]
                    });
                }
            }

            return dataStructered;
        }

    };
})(jQuery);