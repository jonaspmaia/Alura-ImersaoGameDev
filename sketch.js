function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(40);
  somBruxinha.loop();
  // somDoJogo.loop();
  jogo = new Jogo();
  telaInicial = new TelaInicial();
  jogo.setup();
  cenas = {
    jogo,
    telaInicial,
  };
  botaoGerenciador = new BotaoGerenciador('Iniciar');
}

function keyPressed() {
  jogo.keyPressed(key);
}

function draw() {
  cenas[cenaAtual].draw();
}

function touchStarted() {
  getAudioContext().resume();
}
