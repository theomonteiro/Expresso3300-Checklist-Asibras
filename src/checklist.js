document.querySelector("#addLote").addEventListener("click", () => {
    const container = document.querySelector("#lotesContainer");
    const count = container.querySelectorAll(".lote").length + 1;

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("lote");
    input.placeholder = `Lote ${count}`;

    container.appendChild(input);
});

// ADICIONAR ESTIBAS DINÂMICAS
document.querySelector("#addEstiba").addEventListener("click", () => {
    const container = document.querySelector("#estibasContainer");
    const count = container.querySelectorAll(".estibaItem").length + 1;

    const wrapper = document.createElement("div");
    wrapper.classList.add("estibaItem");

    wrapper.innerHTML = `
        <label>Estiba ${count}</label>
        <input type="file" class="estibaInput" accept="image/*">
    `;

    container.appendChild(wrapper);
});
