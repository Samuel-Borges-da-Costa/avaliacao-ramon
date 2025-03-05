const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

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
});

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    raquete.moverRaquete()
    raquete.desenhar(ctx, 'white')
    bola.moverBola()
    bola.verificarColisaoRaquete(raquete)
    bola.verificarColisaoParedes()
    bola.desenhar(ctx, 'red')
    requestAnimationFrame(loop)
    
}
loop()