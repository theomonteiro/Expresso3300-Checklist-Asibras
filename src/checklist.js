import { auth, db, storage } from "../firebase.js";
import { 
    collection, addDoc, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-storage.js";


// =============================
// ADICIONAR LOTES DINAMICAMENTE
// =============================
document.querySelector("#addLote").addEventListener("click", () => {
    const container = document.querySelector("#lotesContainer");
    const count = container.querySelectorAll(".lote").length + 1;

    const input = document.createElement("input");
    input.type = "text";
    input.classList.add("lote");
    input.placeholder = `Lote ${count}`;

    container.appendChild(input);
});


// =============================
// ADICIONAR ESTIBAS DINAMICAMENTE
// =============================
document.querySelector("#addEstiba").addEventListener("click", () => {
    const container = document.querySelector("#estibasContainer");
    const count = container.querySelectorAll(".estibaItem").length + 1;

    const wrapper = document.createElement("div");
    wrapper.classList.add("estibaItem");

    wrapper.innerHTML = `
        <label>Estiba ${count}</label>
        <input type="file" class="estibaInput" accept="image/*" multiple>
    `;

    container.appendChild(wrapper);
});


// =============================
// ENVIAR IMAGENS PARA STORAGE
// =============================

async function uploadEstibasToStorage(notaFiscal) {
    const estibas = document.querySelectorAll(".estibaInput");
    const urls = [];

    let index = 1;

    for (const estiba of estibas) {
        for (const file of estiba.files) {

            const imageRef = ref(storage, `checklists/${notaFiscal}/estiba_${index}_${file.name}`);

            await uploadBytes(imageRef, file);

            const downloadURL = await getDownloadURL(imageRef);

            urls.push(downloadURL);
        }

        index++;
    }

    return urls;
}


// =============================
// ENVIAR CHECKLIST AO FIRESTORE
// =============================

document.querySelector("#enviarChecklist").addEventListener("click", async () => {
    const dataCarregamento = document.querySelector("#dataCarregamento").value;
    const notaFiscal = document.querySelector("#notaFiscal").value.trim();

    if (!notaFiscal) {
        alert("A nota fiscal é obrigatória!");
        return;
    }

    // PEGAR LOTES
    const lotes = [...document.querySelectorAll(".lote")].map(input => input.value.trim());

    try {
        // 1 — ENVIAR IMAGENS PARA O STORAGE
        const estibasURLs = await uploadEstibasToStorage(notaFiscal);

        // 2 — SALVAR NO FIRESTORE
        await addDoc(collection(db, "checklists"), {
            dataCarregamento,
            notaFiscal,
            lotes,
            estibas: estibasURLs,
            criadoEm: serverTimestamp(),
            usuario: auth.currentUser ? auth.currentUser.email : "desconhecido"
        });

        alert("Checklist enviado com sucesso!");
        location.reload();

    } catch (error) {
        console.error(error);
        alert("Erro ao enviar checklist!");
    }
});
