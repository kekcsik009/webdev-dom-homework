import { loginUser,registerUser } from "../api.js";
export let name;

export function renderLoginComponent({ appEl, setToken, getComments }) {
  let isLoginMode = true;

  const renderForm = () => {
    const appHtml = `
      <div class="login-form">
      <h3>Форма ${isLoginMode ? "входа" : "регистрации"}</h3>
      ${
        isLoginMode
          ? ""
          : `
            <input type="text" id="name-input" class="form-login" placeholder="Введите имя"/>`
      }
          
          <input type="text" id="login-input" class="form-login" placeholder="Введите логин"/>
          <input type="password" id="password-input" class="form-password" placeholder="Введите пароль"/>
      
        <button class="login-form-button" id="login-button">${
          isLoginMode ? "Войти" : "Перейти к регистрации"
        }</button>

        <button class="login-button" id="toggle-button">${
          isLoginMode ? "Перейти к регистрации" : "Войти"
        }</button>`;

    appEl.innerHTML = appHtml;

    document.getElementById("login-button").addEventListener("click", () => {
      if (isLoginMode) {
        const login = document.getElementById("login-input");
        const password = document.getElementById("password-input");

        login.classList.remove("error");

        if (login.value == "") {
          login.classList.add("error");
          return;
        }

        password.classList.remove("error");

        if (password.value == "") {
          password.classList.add("error");
          return;
        }

        loginUser({
          login: login.value,
          password: password.value,
        })
          .then((user) => {
            setToken(`Bearer ${user.user.token}`);
            name = user.user.name;
            getComments();
          })
          .catch((error) => {
            alert(error.message);
          });
      } else {
        const login = document.getElementById("login-input");
        const name = document.getElementById("name-input");
        const password = document.getElementById("password-input");

        login.classList.remove("error");

        if (login.value == "") {
          login.classList.add("error");
          return;
        }

        password.classList.remove("error");

        if (password.value == "") {
          password.classList.add("error");
          return;
        }

        name.classList.remove("error");

        if (name.value == "") {
          name.classList.add("error");
          return;
        }

        registerUser({
          login: login.value,
          password: password.value,
          name: name.value,
        })
          .then((user) => {
            setToken(`Bearer ${user.user.token}`);
            getComments();
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    });

    document.getElementById("toggle-button").addEventListener("click", () => {
      isLoginMode = !isLoginMode;
      renderForm();
    });
  };

  renderForm();
}