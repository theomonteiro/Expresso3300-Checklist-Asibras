import { db } from "./firebase/firebase.js";
import { 
    collection,
    query, 
    where, 
    getDocs 
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

document.querySelector("#btnBuscar").addEventListener("click", buscarChecklist);

async function buscarChecklist() {
    const nf = document.querySelector("#nfInput").value.trim();
    const resultBox = document.querySelector("#result");

    if (!nf) {
        resultBox.innerHTML = "<p>Digite um número de Nota Fiscal.</p>";
        return;
    }

    resultBox.innerHTML = "<p>Buscando...</p>";

    try {
        const q = query(
            collection(db, "checklists"),
            where("notaFiscal", "==", nf)
        );

        const snap = await getDocs(q);

        if (snap.empty) {
            resultBox.innerHTML = `<p>Nenhum checklist encontrado para NF <b>${nf}</b>.</p>`;
            return;
        }

        snap.forEach(doc => {
            const data = doc.data();
            resultBox.innerHTML = gerarHTML(data);
        });

    } catch (error) {
        console.error(error);
        resultBox.innerHTML = "<p>Erro ao buscar dados.</p>";
    }
}

function gerarHTML(data) {
    return `
        <h2>Checklist Encontrado</h2>

        <p><strong>Data:</strong> ${data.dataCarregamento}</p>
        <p><strong>Nota Fiscal:</strong> ${data.notaFiscal}</p>

        <h3>Lotes</h3>
        <ul>
            ${data.lotes.map(l => `<li>${l}</li>`).join("")}
        </ul>

        <h3>Estibas</h3>
        ${data.estibas.map((url, i) => `
            <div>
                <p><strong>Estiba ${i + 1}</strong></p>
                <img src="${url}" alt="Foto da estiba ${i+1}">
            </div>
        `).join("")}

        <h3>Fotos adicionais</h3>
        ${data.fotosExtras.map(url => `
            <div>
                <img src="${url}" alt="Foto adicional">
            </div>
        `).join("")}
    `;
}
