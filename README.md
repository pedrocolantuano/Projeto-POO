# 🐱 Cat Clicker – Jogo de Cliques com Upgrades

📌 **Integrantes do projeto:**  
- Pedro Colantuano Lima 
- Luiz Felipe Hero da Silva  

---

## 🎮 Sobre o Projeto

O **Cat Clicker** é um jogo de cliques desenvolvido em **JavaScript e TypeScript**, onde o jogador clica no meu gato, o "Sol" para ganhar pontos (miados).  
Com os miados acumulados, é possível comprar upgrades que aumentam o valor dos miados ganhos por clique ou ganhos de miados passivos.

O projeto é todo em POO, utilizando manipulação do DOM, classes, eventos de clique e teclado, sistema de upgrades e animações simples, resultando em uma aplicação interativa e divertida.

---

## 🧱 Funcionalidades Principais

### 🖱️ **Sistema de Clique**
- Cada clique adiciona pontos.
- Mostra animação flutuante com o valor do clique.
- Reproduz sons variados de miados com pequenas aleatoriedades de volume e pitch.

### 🛠️ **Upgrades Ativos**
Upgrades que aumentam o valor do clique:
- Exemplo: *"Miar mais alto"* e *"Clique Duplo"*.

### 🌙 **Upgrades Passivos**
Geram pontos automaticamente por segundo:
- *Gato Hacker*  
- *Filhote*

Cada upgrade aumenta de nível e tem o custo recalculado automaticamente.

### ⚙️ **Sistema de Renda Passiva**
- O jogo calcula ganhos 20 vezes por segundo.
- Mantém pontuação sempre atualizada em tela.

### 💤 **Acessibilidade**
- Clique ativável também pelo teclado (Enter ou espaço).

---

## 📂 Estrutura do Código em POO

Principais classes implementadas:

| Classe | Função |
|-------|--------|
| `Banco` | Guarda e manipula o saldo (miados). |
| `Click` | Controla o valor por clique, som e animações. |
| `UpgradeClick` | Upgrades que aumentam o valor do clique. |
| `UpgradePassivo` | Upgrades que geram pontos automaticamente. |
| `GanhoAutomatico` | Calcula e adiciona renda passiva. |
| `Jogo` | Integra todas as mecânicas do jogo. |

---

## 🚀 Como Rodar o Projeto

1. Baixe ou clone o repositório:
   ```bash
   git clone https://github.com/SEU-REPO-AQUI.git
