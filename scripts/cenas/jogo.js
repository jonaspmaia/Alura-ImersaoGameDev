class Jogo {
  constructor() {
    this.indice = 0;
    this.mapa = fita.mapa;
  }

  setup() {
    cenario = new Cenario(imagemCenario, 3);
    pontuacao = new Pontuacao();
    vida = new Vida(fita.configuracoes.vidaMaxima,
      fita.configuracoes.vidaInicial);

    personagem = new Personagem(matrizPersonagem, imagemPersonagem,
      100, 20, 130, 165, 220, 270);
    const inimigo = new Inimigo(matrizInimigo, imagemInimigo,
      width - 72, 5, 72, 72, 104, 104, 12);
    const inimigoGrande = new Inimigo(matrizInimigoGrande, imagemInimigoGrande,
      width, 0, 220, 220, 400, 400, 10);
    const inimigoVoador = new Inimigo(matrizInimigoVoador, imagemInimigoVoador,
      width, 200, 120, 95, 200, 150, 15);

    inimigos.push(inimigo, inimigoGrande, inimigoVoador);
  }

  keyPressed(key) {
    if (key === 'ArrowUp' || 'Space') {
      personagem.pula();
      somDoPulo.play();
    }
  }

  draw() {
    cenario.exibe();
    cenario.move();

    vida.draw();

    pontuacao.exibe();
    pontuacao.adicionarPontos();

    personagem.exibe();
    personagem.aplicaGravidade();

    const linhaAtual = this.mapa[this.indice];
    const inimigo = inimigos[linhaAtual.inimigo];
    const inimigoVisivel = inimigo.x < - inimigo.largura;

    inimigo.velocidade = linhaAtual.velocidade;

    inimigo.exibe();
    inimigo.move();

    if (inimigoVisivel) {
      this.indice++;
      inimigo.aparece();
      if (this.indice > this.mapa.length - 1) {
        this.indice = 0;
      }
    }

    if (personagem.estaColidindo(inimigo)) {
      vida.perdeVida();
      personagem.tornarInvencivel();

      if (vida.vidas < 0) {
        image(imagemGameOver, width / 2 - 200, height / 2);
        noLoop()

      }
    }
  }
}
