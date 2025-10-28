class Banco{
    #saldo;

    constructor(saldoInicial = 0){
        this.#saldo = saldoInicial;
    }

    getSaldo(){
        return this.#saldo;
    }

    adicionar(valor){
        this.#saldo += valor;
    }

    remover(valor){
        this.#saldo += valor;
    }

    remover(valor){
        if(this.#saldo >= valor){
            this.#saldo -= valor;
            return true;
        }
        return false;
    }

}

class Click{
    #valor;

    constructor(valorInicial = 1){
        this.#valor = valorInicial;
    }

    getValor(){
        return this.#valor;
    }

    aumentarValor(valor){
        this.#valor += valor;
    }

    clicar(banco, valorPont, clicou){
        banco.adicionar(this.#valor);
        valorPont.textContent = banco.getSaldo();

        this.#animarClique(clicou);
    }

    #animarClique(clicou){
    const num = document.createElement("span");
    num.textContent = `+${this.#valor}`;
    num.classList.add("floating");

    num.style.left = `${clicou.clientX}px`;
    num.style.top = `${clicou.clientY - 20}px`;

    document.body.appendChild(num);
    setTimeout(() => num.remove(),500);
}

}




const imgGato = document.getElementById("gatoSol");
const valorPont = document.getElementById("pontuacao");
const banco = new Banco();
const click = new Click();

imgGato.addEventListener("click", (clicou) => {
    click.clicar(banco, valorPont, clicou);
});