let numCartas = Number(prompt("Escolha um número par de 4 a 14 para escolher a quantidade de cartas que deseja jogar!"));

// Loop que so para quando a pessoa escolhe um numero de cartas PAR entre 4 e 14
while (true) { 
    if (numCartas % 2 === 0 && numCartas >= 4 && numCartas <= 14) {
        alert("O jogo começará com " + numCartas + " cartas!");
        comecarJogo();
        break;
    } else {
        alert("O número selecionado não pode ser utilizado.");
        numCartas = Number(prompt("Por favor, escolha um número par de 4 a 14 para escolher a quantidade de cartas que deseja jogar!"));
    }
}

function comecarJogo() {
    let duplas = separarDuplas(numCartas);
    duplas = embaralharCartas(duplas);


    // Apenas visual
    if (numCartas < 9) { // se o nnumero de cartas for entre 4 e 8, as cartas vao ficar em uma unica fileira
        const fileira1 = document.querySelector(".fileira1");
        duplas.forEach(carta => {
            fileira1.innerHTML += `<button onclick="virarCarta(this)" data-imagem="${carta.imagem}"><img src="assets/back.png" alt="Card Back"></button>`;
        });
    } else { // se o numero de cartas for maior que 8, vai separar as cartas em 2 fileiras
        const fileira1 = document.querySelector(".fileira1");
        const fileira2 = document.querySelector(".fileira2");
        const cartasPorFileira = numCartas / 2;

        for (let i = 0; i < cartasPorFileira; i++) {
            fileira1.innerHTML += `<button onclick="virarCarta(this)" data-imagem="${duplas[i].imagem}"><img src="assets/back.png" alt="Card Back"></button>`;
        }
        for (let i = cartasPorFileira; i < numCartas; i++) {
            fileira2.innerHTML += `<button onclick="virarCarta(this)" data-imagem="${duplas[i].imagem}"><img src="assets/back.png" alt="Card Back"></button>`;
        }
    }
}

//funcao que separa a  quantidade total de cartas em duplas e da uma imagem em comum a essas duplas
function separarDuplas(numCartas) {
    let duplas = [];
    let imagemDupla = ['bobrossparrot.gif', 'explodyparrot.gif', 'fiestaparrot.gif', 'metalparrot.gif', 'revertitparrot.gif', 'tripletsparrot.gif', 'unicornparrot.gif'];

    for (let i = 0; i < numCartas / 2; i++) { // divide a quantidade de cartas totais em duplas e guarda duas cartas com o mesmo ID e mesma foto na let duplas
        const imagem = imagemDupla[i];
        duplas.push({ id: i + 1, imagem: imagem });
        duplas.push({ id: i + 1, imagem: imagem });
    }
    return duplas;
}

// funcoes de embaralhar as cartas
function embaralharCartas(duplas) {
    return duplas.sort(comparador);
}

function comparador() { 
    return Math.random() - 0.5; 
}

// as funcoes a seguir vai permitir o jogador a virar uma carta e comparar com outra carta de sua escolha, fazendo com que voce marque um ponto ou precise tentar de novo
let primeiraCarta = null; // armazena a primeira carta que voce clicar
let quantidadeDeJogadas = 0;
let pontos = 0;

function virarCarta(elemento) {

    const imagem = elemento.getAttribute("data-imagem"); // pega a imagem escondida da carta
    elemento.querySelector("img").src = `assets/${imagem}`; // sibstitui a imagem
    elemento.classList.add("virar"); // vira a imagem

    if (primeiraCarta === null) { // vai ver se é a primeira carta a ser virada
        primeiraCarta = elemento;
        quantidadeDeJogadas++;
    } else {
        quantidadeDeJogadas++;
        verificarDupla(elemento); //ve se a segunda carta é uma dupla
    }
}

function verificarDupla(segundoElemento) {

    // pega a imagem das 2 cartas
    const primeiraImagem = primeiraCarta.getAttribute("data-imagem"); 
    const segundaImagem = segundoElemento.getAttribute("data-imagem");

    if (primeiraImagem === segundaImagem) { //compara a primeira imagem da primeira carta com a segunda, se forem iguais ficam pra cima e reseta o primeiro clique para ver a proxima carta
        primeiraCarta = null;

        pontos++; // quando a carta acha seu par ele contabiliza um ponto
        if(pontos === numCartas/2){ // quando a quantidade de pontos for igual a quantidade de duplas que existem, o jogo acaba
            setTimeout(() => {alert(`Parabéns, você venceu em ${quantidadeDeJogadas} jogadas! =)`)}, 500);
        }
    } else {
        setTimeout(() => {
            // volta a imagem que era antes
            primeiraCarta.querySelector("img").src = "assets/back.png";
            segundoElemento.querySelector("img").src = "assets/back.png";
            //remove a classe virar para "desvirar" a carta
            primeiraCarta.classList.remove("virar");
            segundoElemento.classList.remove("virar");
            primeiraCarta = null; //reseta o primeiro clique para ver a proxima carta
        }, 1000); // demora 1 segundo para isso acontecer
    }
}

