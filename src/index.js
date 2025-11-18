import { auth } from "./firebase/firebase.js";
import { 
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";


/* função de autenticação antiga
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log("✅ Logged in!");
    } else {
        console.log("❌ No user!");
    }
});*/

onAuthStateChanged(auth, user => {
    if (user) {
        console.log("Usuário já logado:", user.email);
        window.location.href = "./src/pages/checklist.html";
    }
});

// LOGIN

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        console.log("Login realizado:", userCredential.user.email);
        window.location.href = "./src/pages/checklist.html";
    } catch (error) {
        console.error(error.code, error.message);
        alert("Erro ao fazer login:" + error.code);
    }

});


/* 
import { auth } from "./firebase.js";
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// 1) Se o usuário já estiver logado, manda direto para o checklist
onAuthStateChanged(auth, user => {
    if (user) {
        console.log("Usuário já logado:", user.email);
        window.location.href = "./src/pages/checklist.html";
    }
});

// 2) Função de login com email e senha
const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        console.log("Login realizado:", userCredential.user.email);
        window.location.href = "./src/pages/checklist.html";
    } catch (error) {
        console.error(error.code, error.message);
        alert("Erro ao fazer login: " + error.code);
    }
});
*/
