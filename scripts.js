let flippedCards = [] // Array que armazena as cartas viradas (sempre terá no máximo duas)
let matchedPairs = 0 // contador de pares encontrados
let attempts = 0 // contador de tentativas do jogador
let isCheckingPair = false // trava o jogo enquanto verifica o par ou esconde as cartas

const cardItems = [
    { id: 1, content: "🚀", matched: false },
    { id: 2, content: "🚀", matched: false },
    { id: 3, content: "😎", matched: false },
    { id: 4, content: "😎", matched: false },
    { id: 5, content: "🎮", matched: false },
    { id: 6, content: "🎮", matched: false },
    { id: 7, content: "🎨", matched: false },
    { id: 8, content: "🎨", matched: false },
    { id: 9, content: "🎯", matched: false },
    { id: 10, content: "🎯", matched: false },
    { id: 11, content: "🎲", matched: false },
    { id: 12, content: "🎲", matched: false },
    { id: 13, content: "🎸", matched: false },
    { id: 14, content: "🎸", matched: false },
    { id: 15, content: "🎪", matched: false },
    { id: 16, content: "🎪", matched: false },
]

// Função que embaralha as cartas
function shuffleCards(array){
    const shuffled = array.sort(() => (Math.random() > 0.5 ? 1 : -1)) // Positivo vai depois, negativo vai antes.
    
    return shuffled
}

function createCard(card) {
    // Cria o elemento principal da carta.
    const cardElement = document.createElement("div")
    cardElement.className = "card"

    // Cria o elemento do emoji
    const emoji = document.createElement("span")
    emoji.className = "card-emoji"
    emoji.textContent = card.content

    //Adiciona o emoji ao card
    cardElement.appendChild(emoji)

    // Adiciona o evento de clique na carta.
    cardElement.addEventListener("click", () => handleCardClick(cardElement, card))

    return cardElement
}

function renderCards() {
    const deck = document.getElementById("deck")
    deck.innerHTML = ""

    const cards = shuffleCards(cardItems)
    cards.forEach((item) => {
        const cardElement = createCard(item)
        deck.appendChild(cardElement)
    })
}

function handleCardClick(cardElement, card) {
    if(
        isCheckingPair || cardElement.classList.contains("revealed")){
        return
    }
    // Revela a carta
    cardElement.classList.add("revealed")
    console.log(cardElement.classList.contains("revealed"))

    // Adicionar no Array as cartas viradas.
    flippedCards.push({ cardElement, card})

    // Verificar se é a segunda carta virada.
    if (flippedCards.length === 2) {
        isCheckingPair = true
        attempts++

        // Seleciona as cartas
        const [firstCard, secondCard] = flippedCards
    
        // Verifica se as cartas formam um par
        if(firstCard.card.content === secondCard.card.content){
            matchedPairs++ 

            // Marcar as cartas como encontradas.
            cardItems.forEach((item) => {
                if (item.content === firstCard.card.content) {
                    item.matched = true
                }
            })
            
            // Limpa Array de cartas viradas.
            flippedCards = []
            // Libera próxima rodada
            isCheckingPair = false
            // Atualiza o placar
            updateStatus()

            // Verifica se tem itens para encontrar
            const toFind = cardItems.find(item => item.matched === false)

            if (!toFind) {
                alert("Parabéns, você encontrou todos os pares!")
            }
        } else {
            setTimeout(() => {
                firstCard.cardElement.classList.remove("revealed")
                secondCard.cardElement.classList.remove("revealed")
                flippedCards = []
                isCheckingPair = false
                updateStatus()
            }, 1000)
        }

        
    }
}


function updateStatus() {
    document.getElementById(
        "stats"
    ).textContent = `${matchedPairs} acertos de ${attempts} tentativas`
}


// Função que reinicia o jogo
function resetGame() {
    flippedCards = []
    matchedPairs = 0
    attempts = 0
    isCheckingPair = false

    // Desmarca todas as cartas
    cardItems.forEach((card) => (card.matched = false))

    // Renderiza novamente e atualiza o placar
    renderCards()
    updateStatus()
} 

function initGame() {
    renderCards()

    // Adiciona o evento de reiniciar o jogo no botão
    document.getElementById("restart").addEventListener("click", resetGame)
}

initGame()
