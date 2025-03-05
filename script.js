const canvas = document.getElementById('jogoCanvas')
const ctx = canvas.getContext('2d')

class Entidade {
    #gravidade
    constructor(propriedades){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura
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