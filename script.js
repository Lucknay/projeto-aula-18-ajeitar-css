const resultado = document.querySelector("#resultado");

// Função para buscar produtos
async function buscar_produtos() {
    try {
        const resposta = await fetch('https://fakestoreapi.com/products');
        const dados = await resposta.json();
        console.log(dados);

        dados.forEach((produto_da_vez) => {
            const card = document.createElement("div");
            card.className = "card";

            const imagem = document.createElement("img");
            imagem.src = produto_da_vez.image;

            const preco = document.createElement("p");
            preco.textContent = `R$ ${produto_da_vez.price}`;
            preco.className = "price";

            const botao = document.createElement("button");
            botao.textContent = "Comprar";
            botao.className = "botao";

            botao.addEventListener("click", () => {
                adicionarAoCarrinho(produto_da_vez);
            });

            card.append(imagem, preco, botao);
            resultado.append(card);
        });
    } catch (error) {
        console.log(error);
        resultado.textContent = "Deu erro!";
    }
}

// Função para adicionar ou atualizar o item no carrinho
function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verificar se o produto já está no carrinho
    const itemExistente = carrinho.find(item => item.id === produto.id);

    if (itemExistente) {
        // Se o item já estiver no carrinho, aumentar a quantidade
        itemExistente.quantidade += 1;
    } else {
        // Se o item não estiver no carrinho, adicioná-lo com quantidade 1
        carrinho.push({ ...produto, quantidade: 1 });
    }

    // Salvar o carrinho atualizado no Local Storage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    // Navegar para a página do carrinho
    window.location.href = "./carrinho.html";
}

buscar_produtos();