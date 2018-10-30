/* Para a mudança das imagens na homepage */

document.addEventListener('DOMContentLoaded', function () {

    var infoMiniaturaPopulacao = document.getElementById('info-miniatura-populacao');
    var miniaturaPopulacao = document.getElementById('miniatura-populacao');

    var infoMiniaturaAtendente = document.getElementById('info-miniatura-atendente');
    var miniaturaAtendente = document.getElementById('miniatura-atendente');

    /* Caso a tela esteja menor que 600px não é necessário de efeitos de mouseleave e mouseover porque muito
    provavelmente está se mexendo em um aparelho mobile */
    window.addEventListener('resize', function (e) {
        e.preventDefault();

        if (window.screen.width <= 600) {
            infoMiniaturaPopulacao.style.display = "block";
            infoMiniaturaAtendente.style.display = "block";
        } else {
            infoMiniaturaPopulacao.style.display = "none";
            infoMiniaturaAtendente.style.display = "none";
        }
    });

    miniaturaPopulacao.addEventListener('mouseover', function (e) {
        putBodyImg(infoMiniaturaPopulacao, "../img/atendimento-populacao3.jpg");
    });

    miniaturaAtendente.addEventListener('mouseover', function (e) {
        putBodyImg(infoMiniaturaAtendente, "../img/controle-estoque2.jpg");
    });

    miniaturaPopulacao.addEventListener('mouseleave', function (e) {
        putOffBodyImg(infoMiniaturaPopulacao, "../img/care-health.jpg");
    });

    miniaturaAtendente.addEventListener('mouseleave', function (e) {
        putOffBodyImg(infoMiniaturaAtendente, "../img/care-health.jpg");
    });

});

// Troca a imagem quando passa o mouse sobre a blackbox da imagem
function putBodyImg(infoMiniatura, pathImg) {
    infoMiniatura.style.display = "block";
    document.body.style.backgroundImage = "url(" + pathImg + ")";
    document.body.style.transition = "background-image 0.5s ease-in-out 0.2s";
}

// Troca para imagem padrão quando o mouse sai do blackbox da imagem
function putOffBodyImg(infoMiniatura, pathImgPaddern) {
    infoMiniatura.style.display = "none";
    document.body.style.backgroundImage = "url(" + pathImgPaddern + ")";
    document.body.style.transition = "background-image 0.5s ease-in-out 0.2s";
}