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
const raquete = new Raquete({
        x: 100,
        y: canvas.height - 20,
        largura: 80,
        altura: 10
    })

document.addEventListener('keydown', (e) => {
    if (e.key == 'KeyA') {
        raquete.setDirecao(1)
    } else if (e.key == 'keyD') {
        raquete.setDirecao(-1)
    }
});

document.addEventListener('keyup', () => {
    raquete.setDirecao(0)
})
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    raquete.mover()
    raquete.desenhar(ctx, 'blue')

    requestAnimationFrame(atualizar)



function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    raquete.mover()
    raquete.desenhar(ctx, 'white')
    requestAnimationFrame(loop())
    
}
loop()