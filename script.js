const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

let gameover = false
let pontos = 0

function congelarTela() {
    document.getElementById('overlay').style.display = 'block'
  }

  document.addEventListener("click", (e) =>{
    if(gameover){
        location.reload()
    }
})


class Entidade {
    #gravidade
    constructor(propriedades){
        this.x = propriedades.x;
        this.y = propriedades.y;
        this.largura = propriedades.largura;
        this.altura = propriedades.altura
        this.#gravidade=0.5
    }
    desenhar = function (ctx, cor) {
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
    getGravidade() {
        return this.#gravidade;
    }
}

class Raquete extends Entidade {
    constructor(propriedades) {
        super(propriedades)
        this.velocidade = 7
        this.direcao = 0
    }


    moverRaquete() {
        if (this.direcao == 1 && this.x > 0) {
            this.x -= this.velocidade
        } else if (this.direcao == -1 && this.x + this.largura < canvas.width) {
            this.x += this.velocidade
        }
    }
    
    setDirecao(direcao) {
        this.direcao = direcao;
    }
}


class Bola extends Entidade {
    #velocidadeX
    #velocidadeY
    constructor(propriedades) {
        super(propriedades)
        this.velocidadeX = 4
        this.velocidadeY = -4
    }

    moverBola() {
        this.x += this.velocidadeX
        this.y += this.velocidadeY
    }

    verificarColisaoRaquete(raquete) {
        if (this.x > raquete.x && this.x < raquete.x + raquete.largura &&
            this.y + this.altura > raquete.y && this.y < raquete.y + raquete.altura) {
            this.velocidadeY = -this.velocidadeY
        }
    }

    verificarColisaoParedes() {
        if (this.x < 0) {
            this.velocidadeX = -this.velocidadeX
        }
        if (this.x + this.largura > canvas.width) {
            this.velocidadeX = -this.velocidadeX
        }
        if (this.y < 0) {
            this.velocidadeY = -this.velocidadeY
        }
    }

    verificarColisaoBloco(bloco) {
        if(this.x + this.largura > bloco.x && this.x < bloco.x + bloco.largura &&
            this.y + this.altura > bloco.y && this.y < bloco.y + bloco.altura) {
            if (!bloco.destruido) {
                this.velocidadeY = -this.velocidadeY;
                bloco.destruir()
                pontos += 10
            }
        }
    }
}

class Bloco extends Entidade{
    constructor(x, y) {
        super({x, y, largura: 75, altura: 20})
        this.destruido = false
    }

    destruir() {
        this.destruido = true
    }

    desenhar2(ctx, cor) {
        if (this.destruido) {
            cor = "black"
            ctx.fillStyle = cor
        }else{
            ctx.fillStyle = "red"
            ctx.fillRect(this.x, this.y, this.largura, this.altura)
        }
    }
}


const raquete = new Raquete({
        x: 100,
        y: canvas.height - 20,
        largura: 80,
        altura: 10
    })

document.addEventListener('keydown', (e) => {
    if (e.key == 'a') {
        raquete.setDirecao(1)
    } else if (e.key == 'd') {
        raquete.setDirecao(-1)
    }
});

document.addEventListener('keyup', () => {
    raquete.setDirecao(0)
})

const bola = new Bola({
    x: canvas.width / 2 - 10,
    y: canvas.height - 40,
    largura: 20,
    altura: 20
})

const blocos = []
for (r = 0; r < 9; r++){
    for (c = 0; c < 5; c++) {
        blocos.push(new Bloco(r * (75 + 10) + 35, c * (20 + 10) + 30))
    }
}

function gameOver() {
    ctx.fillStyle = 'red'
    ctx.fillRect((canvas.width / 2) - 200, (canvas.height / 2) - 50, 400, 100)
    ctx.fillStyle = 'black'
    ctx.font = "50px Arial"
    ctx.fillText("Game Over", (canvas.width / 2) - 130, (canvas.height / 2) + 15)
    gameover = true
    congelarTela()
}

function verificarGameOver() {
    if (bola.y + bola.altura >= canvas.height) {
        gameOver()
    }
}

function desenharPontos() {
    ctx.fillStyle = 'white'
    ctx.font = "20px Arial"
    ctx.fillText("Pontos: " + pontos, 10, 30)
}

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    raquete.moverRaquete()
    raquete.desenhar(ctx, 'blue')
    bola.moverBola()
    bola.verificarColisaoRaquete(raquete)
    bola.verificarColisaoParedes()
    bola.desenhar(ctx, 'white')
    blocos.forEach(bloco => {
        bola.verificarColisaoBloco(bloco)
        bloco.desenhar2(ctx)
    })
    verificarGameOver()
    desenharPontos()
    requestAnimationFrame(loop)
    
}
loop()