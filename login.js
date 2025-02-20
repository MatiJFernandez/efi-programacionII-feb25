document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.getElementById("registerEmail").value;
    let password = document.getElementById("registerPassword").value;
    localStorage.setItem(email, password);
    alert("Registro exitoso, ahora puedes iniciar sesión.");
    document.getElementById("registerSection").classList.add("d-none");
    document.getElementById("loginForm").parentElement.classList.remove("d-none");
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    let storedPassword = localStorage.getItem(email);
    if (storedPassword === password) {
        sessionStorage.setItem("user", email);
        alert("Inicio de sesión exitoso");
        window.location.href = "/index.html";
    } else {
        alert("Credenciales incorrectas");
    }
});

document.getElementById("showRegister").addEventListener("click", function() {
    document.getElementById("registerSection").classList.remove("d-none");
    document.getElementById("loginForm").parentElement.classList.add("d-none");
});

document.getElementById("showLogin").addEventListener("click", function() {
    document.getElementById("registerSection").classList.add("d-none");
    document.getElementById("loginForm").parentElement.classList.remove("d-none");
});