window.addEventListener("DOMContentLoaded", () => {
    ligarBotoes();
});
class Banco {
    constructor(saldoInicial = 0) {
        this.saldo = saldoInicial;
    }
    getSaldo() { return this.saldo; }
    adicionar(valor) { this.saldo += valor; }
    remover(valor) {
        if (this.saldo >= valor) {
            this.saldo -= valor;
            return true;
        }
        return false;
    }
}
class Click {
    constructor(valorInicial = 1) { this.valor = valorInicial; }
    getValor() { return this.valor; }
    aumentarValor(valor) { this.valor += valor; }
    clicar(banco, valorPont, clicou) {
        banco.adicionar(this.valor);
        valorPont.textContent = Math.floor(banco.getSaldo()).toString();
        this.animarClique(clicou);
    }
    animarClique(clicou) {
        const num = document.createElement("span");
        num.textContent = `+${this.valor}`;
        num.classList.add("floating");
        num.style.left = `${clicou.clientX}px`;
        num.style.top = `${clicou.clientY - 20}px`;
        document.body.appendChild(num);
        setTimeout(() => num.remove(), 500);
    }
}
class UpgradeClick {
    constructor(nome, custoInicial, bonus) {
        this.nome = nome;
        this.custo = custoInicial;
        this.bonus = bonus;
        this.nivel = 0;
    }
    getNome() { return this.nome; }
    getCusto() { return this.custo; }
    getNivel() { return this.nivel; }
    comprar(click, banco, spanPreco) {
        if (banco.getSaldo() >= this.custo) {
            banco.remover(this.custo);
            this.nivel++;
            click.aumentarValor(this.nivel);
            this.custo = Math.floor(this.custo * 1.5);
            spanPreco.textContent = this.custo.toString();
            console.log(`${this.nome} nível ${this.nivel} comprado! Novo custo: ${this.custo}`);
            return true;
        }
        console.log(`Saldo insuficiente para comprar ${this.nome}.`);
        return false;
    }
}
class UpgradePassivo {
    constructor(nome, custoInicial, bonus) {
        this.nome = nome;
        this.custo = custoInicial;
        this.bonus = bonus;
        this.nivel = 0;
    }
    getNome() { return this.nome; }
    getCusto() { return this.custo; }
    getNivel() { return this.nivel; }
    comprar(ganho, banco, spanPreco) {
        if (banco.getSaldo() >= this.custo) {
            banco.remover(this.custo);
            this.nivel++;
            ganho.aumentarTaxa(this.bonus);
            this.custo = Math.floor(this.custo * 1.5);
            spanPreco.textContent = this.custo.toString();
            console.log(`${this.nome} nível ${this.nivel} comprado! Novo custo: ${this.custo}`);
            if (this.nome === "GatoHacker") {
                adicionarCardGato("../img/up1.png", this.nome);
            }
            else if (this.nome === "Filhote") {
                adicionarCardGato("../img/up2.png", this.nome);
            }
            return true;
        }
        console.log(`Saldo insuficiente para comprar ${this.nome}.`);
        return false;
    }
}
class GanhoAutomatico {
    constructor(taxaInicial = 0) { this.taxa = taxaInicial; }
    getTaxa() { return this.taxa; }
    aumentarTaxa(valor) { this.taxa += valor; }
    gerar(banco) { banco.adicionar(this.taxa); }
}
class Jogo {
    constructor() {
        this.banco = new Banco();
        this.click = new Click();
        this.ganhoAutomatico = new GanhoAutomatico();
        this.iniciarGanhoPorSegundo();
    }
    clicar(evento, elementoPontuacao) {
        this.click.clicar(this.banco, elementoPontuacao, evento);
    }
    comprarUpgradeClick(upgrade, spanPreco) {
        upgrade.comprar(this.click, this.banco, spanPreco);
    }
    comprarUpgradePassivo(upgrade, spanPreco) {
        upgrade.comprar(this.ganhoAutomatico, this.banco, spanPreco);
    }
    iniciarGanhoPorSegundo() {
        const updatesPorSegundo = 20;
        const intervalo = 1000 / updatesPorSegundo;
        setInterval(() => {
            const ganhoTotal = this.ganhoAutomatico.getTaxa();
            const ganhoParcial = ganhoTotal / updatesPorSegundo;
            this.banco.adicionar(ganhoParcial);
            const spanPontuacao = document.getElementById("pontuacao");
            const spanRendaPassiva = document.getElementById("rendaPassiva");
            if (spanPontuacao) {
                spanPontuacao.textContent = Math.floor(this.banco.getSaldo()).toString();
            }
            if (spanRendaPassiva) {
                spanRendaPassiva.textContent = this.ganhoAutomatico.getTaxa().toString();
            }
        }, intervalo);
    }
}
const jogo = new Jogo();
const imgGato = document.getElementById("gatoSol");
const valorPont = document.getElementById("pontuacao");
imgGato.addEventListener("click", (evento) => {
    jogo.clicar(evento, valorPont);
});
const botoes = document.querySelectorAll(".navbar h3");
const conteudo = document.getElementById("conteudo");
if (!conteudo)
    throw new Error("Elemento #conteudo não encontrado");
const paginas = {
    upgrades: `
    <div class="fade-in upgrades-content">
                <div class="click-up">
                    <h2>Aumente o valor do clique!</h2>
                    <button id="btn-upClick">Miar mais alto</button>
                    Preço: <span id="preco-up1">100</span><br><br>
                </div>
                <div class="intro-ups">
                    <h1>Peça ajuda aos especialistas!</h1>
                </div>
                <div class="linha-up">
                    <div class="card-up">
                        <div class="img-up">
                            <img src="./img/up1.png" alt="Imagem gato mexendo no computador">
                        </div>
                        <div class="txt-btn">
                            <h4 class="tit-up">Gatinho Hacker</h4>
                            <p class="desc">Eles fazem barulinhos de teclas!</p>
                            <button id="btn-upPassivo1">Comprar</button>
                            <p>Preço: <span id="preco-passivo1">50</span></p>
                        </div>
                    </div>
                    <div class="card-up">
                        <div class="img-up">
                            <img src="./img/up2.png" alt="Imagem gato dormindo">
                        </div>
                        <div class="txt-btn">
                            <h4 class="tit-up">Filhote de To não</h4>
                            <p class="desc">Ele faz barulinhos enquanto dorme.</p>
                            <button id="btn-upPassivo2">Comprar</button>
                            <p>Preço: <span id="preco-passivo2">50</span></p>
                        </div>
                    </div>

                </div>
            </div>
  `,
    objetivos: `
    <div class="fade-in objetivos-content">
      <h4>Objetivo 1: Clique 100 vezes</h4>
      <h4>Objetivo 2: Ganhe 1000 miados</h4>
    </div>
  `,
    salvar: `
    <div class="fade-in salvar-content">
      <button>Salvar progresso</button>
      <p>Progresso salvo com sucesso!</p>
    </div>
  `
};
botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        botoes.forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");
        const paginaAttr = botao.getAttribute("data-page");
        if (paginaAttr && paginaAttr in paginas) {
            const pagina = paginaAttr;
            conteudo.innerHTML = paginas[pagina];
            ligarBotoes();
        }
    });
});
const upgradeClick = new UpgradeClick("Clique Duplo", 100, 2);
const upPassivo1 = new UpgradePassivo("GatoHacker", 50, 1);
const upPassivo2 = new UpgradePassivo("Filhote", 200, 5);
function ligarBotoes() {
    const btnUpClick = document.getElementById("btn-upClick");
    const btnUpPassivo1 = document.getElementById("btn-upPassivo1");
    const btnUpPassivo2 = document.getElementById("btn-upPassivo2");
    const spanUpClick = document.getElementById("preco-up1");
    const spanPassivo1 = document.getElementById("preco-passivo1");
    const spanPassivo2 = document.getElementById("preco-passivo2");
    if (btnUpClick) {
        btnUpClick.addEventListener("click", () => jogo.comprarUpgradeClick(upgradeClick, spanUpClick));
    }
    if (btnUpPassivo1) {
        btnUpPassivo1.addEventListener("click", () => jogo.comprarUpgradePassivo(upPassivo1, spanPassivo1));
    }
    if (btnUpPassivo2) {
        btnUpPassivo2.addEventListener("click", () => jogo.comprarUpgradePassivo(upPassivo2, spanPassivo2));
    }
    console.log(btnUpClick, btnUpPassivo1, btnUpPassivo2);
}
function adicionarCardGato(imagem, nome) {
    let container;
    if (nome === "GatoHacker") {
        container = document.getElementById("cards-gatos");
    }
    else if (nome === "Filhote") {
        container = document.getElementById("cards-gatos1");
    }
    if (!container)
        return;
    const card = document.createElement("div");
    card.classList.add("card-gato");
    const img = document.createElement("img");
    img.src = imagem;
    img.alt = nome;
    card.title = nome;
    card.appendChild(img);
    container.appendChild(card);
}
export {};
//# sourceMappingURL=script.js.map