const resultado = document.querySelector("#resultado2");

function mostrarCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    if (carrinho.length > 0) {
        let valorTotal = 0;

        carrinho.forEach((produto_da_vez) => {
            const card = document.createElement("div");

            const descricao = document.createElement("p");
            descricao.textContent = produto_da_vez.description;
            descricao.className = "description";

            const imagem = document.createElement("img");
            imagem.src = produto_da_vez.image;

            const preco = document.createElement("p");
            preco.textContent = `R$ ${produto_da_vez.price}`;
            preco.className = "price";

            const categoria = document.createElement("p");
            categoria.textContent = produto_da_vez.category;
            categoria.className = "category";

            const quantidade = document.createElement("p");
            quantidade.textContent = `Quantidade: ${produto_da_vez.quantidade}`;
            quantidade.className = "quantidade";

            card.append(descricao, imagem, preco, categoria, quantidade);
            resultado.append(card);

            // Calcular o valor total do carrinho
            valorTotal += produto_da_vez.price * produto_da_vez.quantidade;
        });

        // Adicionar o valor total ao final da lista
        const total = document.createElement("p");
        total.textContent = `Valor Total: R$ ${valorTotal.toFixed(2)}`;
        total.className = "total";
        resultado.append(total);
    } else {
        resultado.textContent = "Nenhum produto no carrinho.";
    }
}

mostrarCarrinho();