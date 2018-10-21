/* Para a mudança das imagens na homepage */

document.addEventListener('DOMContentLoaded', function() {
    var infoMiniaturaPopulacao = document.getElementById('info-miniatura-populacao');
    var miniaturaPopulacao = document.getElementById('miniatura-populacao');
    var msgPopulacao = "Voltado para população";

    var infoMiniaturaAtendente = document.getElementById('info-miniatura-atendente');
    var miniaturaAtendente = document.getElementById('miniatura-atendente');
    var msgAtendente = "Voltado para os atendentes dos postos";
    
    miniaturaPopulacao.addEventListener('mouseover', function(e) {
        putBodyImg(infoMiniaturaPopulacao, msgPopulacao, "../img/atendimento-populacao3.jpg");
    });

    miniaturaAtendente.addEventListener('mouseover', function(e) {
        putBodyImg(infoMiniaturaAtendente, msgAtendente, "../img/controle-estoque2.jpg");
    });

    miniaturaPopulacao.addEventListener('mouseleave', function(e) {
        putOffBodyImg(infoMiniaturaPopulacao, "../img/care-health.jpg");
    });

    miniaturaAtendente.addEventListener('mouseleave', function(e) {
        putOffBodyImg(infoMiniaturaAtendente, "../img/care-health.jpg");
    });
});

// Troca a imagem quando passa o mouse sobre a blackbox da imagem
function putBodyImg(infoMiniatura, msg, pathImg) {
    infoMiniatura.innerHTML = msg;
    document.body.style.backgroundImage = "url(" + pathImg + ")";
    document.body.style.transition = "background-image 0.5s ease-in-out";
}

// Troca para imagem padrão quando o mouse sai do blackbox da imagem
function putOffBodyImg(infoMiniatura, pathImgPaddern) {
    infoMiniatura.innerHTML = "";
    document.body.style.backgroundImage = "url(" + pathImgPaddern + ")";
    document.body.style.transition = "background-image 0.5s ease-in-out";
}