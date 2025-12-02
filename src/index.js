import { auth } from "./firebase.js";
import { 
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Redireciona usuário logado
onAuthStateChanged(auth, user => {
    if (user) {
        console.log("Usuário já logado:", user.email);
        window.location.href = "./src/pages/checklist.html";
    }
});

// ---- LOGIN ----

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("password").value.trim(); // <-- CORRIGIDO

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        console.log("Login realizado:", userCredential.user.email);
        window.location.href = "./src/pages/checklist.html";

    } catch (error) {
        console.error(error);
        document.getElementById("errorMessage").innerText =
            "Erro ao fazer login: " + error.code;
    }
});
