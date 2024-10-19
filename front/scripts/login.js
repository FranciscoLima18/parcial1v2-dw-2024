import { auth } from "./auth.js";

// Si está autenticado y es administrador, redirigir a la lista de tareas general
if (auth.isAuthenticated() && auth.getRole()) {
  window.location.href = "tareasGenerales/index.html";
} else if (auth.isAuthenticated()) {
  window.location.href = "misTareas/index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("Loginform");
  const submitButton = document.getElementById("registroboton");
  submitButton.addEventListener("click", handleLogin);
});

async function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("contraseña").value;

  try {
    await auth.login(username, password);
    handleSuccessfulLogin();
  } catch (error) {
    handleLoginError(error);
  }
}

function handleSuccessfulLogin() {
  window.alert("Login exitoso");
  document.dispatchEvent(new Event("authChanged"));
  if (auth.getRole()) {
    window.location.href = "tareasGenerales/index.html";
  } else {
    window.location.href = "misTareas/index.html";
  }
}

function handleLoginError(error) {
  window.alert("Login fallido");
  console.error("Login error:", error);
}
