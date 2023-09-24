/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addComment: () => (/* binding */ addComment),\n/* harmony export */   getAndRender: () => (/* binding */ getAndRender),\n/* harmony export */   loginUser: () => (/* binding */ loginUser),\n/* harmony export */   registerUser: () => (/* binding */ registerUser)\n/* harmony export */ });\nconst host = \"https://wedev-api.sky.pro/api/v2/kekcsik/comments\";\r\n\r\n// ---------- Получаем список имеющихся комментариев --------------------------\r\nasync function getAndRender({ token }) {\r\n  return fetch(host, {\r\n    method: \"GET\",\r\n    headers: {\r\n      Authorization: token,\r\n    },\r\n  }).then((response) => {\r\n    if (response.status === 401) {\r\n      throw new Error(\"Нет авторизации\");\r\n    }\r\n    if (response.status === 500) {\r\n      throw new Error(\"Сервер сломался, попробуй позже\");\r\n    }\r\n    return response.json();\r\n  });\r\n}\r\n\r\n// ---------- Отправляем POST-запрос на сервер, чтобы добавить комментарий ----\r\n\r\nasync function addComment({ text, token }) {\r\n  return fetch(host, {\r\n    method: \"POST\",\r\n    body: JSON.stringify({\r\n      text,\r\n    }),\r\n    headers: {\r\n      Authorization: token,\r\n    },\r\n  }).then((response) => {\r\n    if (response.status === 400) {\r\n      throw new Error(\"Комментарий должен быть не короче 3 символов\");\r\n    }\r\n    if (response.status === 500) {\r\n      throw new Error(\"Сервер сломался, попробуй позже\");\r\n    }\r\n    return response.json();\r\n  });\r\n}\r\n// ---------- Отправляем POST-запрос на сервер, чтобы зарегистрировать нового пользователя ---\r\nasync function registerUser({ login, password, name }) {\r\n  return fetch(\"https://wedev-api.sky.pro/api/user\", {\r\n    method: \"POST\",\r\n    body: JSON.stringify({\r\n      login,\r\n      password,\r\n      name,\r\n    }),\r\n  }).then((response) => {\r\n    if (response.status === 400) {\r\n      throw new Error(\"Такой пользователь уже существует\");\r\n    }\r\n    return response.json();\r\n  });\r\n}\r\n\r\n// ---------- Отправляем POST-запрос на сервер, чтобы авторизовать пользователя\r\nasync function loginUser({ login, password }) {\r\n  return fetch(\"https://wedev-api.sky.pro/api/user/login\", {\r\n    method: \"POST\",\r\n    body: JSON.stringify({\r\n      login,\r\n      password,\r\n    }),\r\n  }).then((response) => {\r\n    if (response.status === 400) {\r\n      throw new Error(\"Неверный логин или пароль\");\r\n    }\r\n    return response.json();\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./api.js?");

/***/ }),

/***/ "./components/login-components.js":
/*!****************************************!*\
  !*** ./components/login-components.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   name: () => (/* binding */ name),\n/* harmony export */   renderLoginComponent: () => (/* binding */ renderLoginComponent)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api.js */ \"./api.js\");\n\r\nlet name;\r\n\r\nfunction renderLoginComponent({ appEl, setToken, getComments }) {\r\n  let isLoginMode = true;\r\n\r\n  const renderForm = () => {\r\n    const appHtml = `\r\n      <div class=\"login-form\">\r\n      <h3>Форма ${isLoginMode ? \"входа\" : \"регистрации\"}</h3>\r\n      ${\r\n        isLoginMode\r\n          ? \"\"\r\n          : `\r\n            <input type=\"text\" id=\"name-input\" class=\"form-login\" placeholder=\"Введите имя\"/>`\r\n      }\r\n          \r\n          <input type=\"text\" id=\"login-input\" class=\"form-login\" placeholder=\"Введите логин\"/>\r\n          <input type=\"password\" id=\"password-input\" class=\"form-password\" placeholder=\"Введите пароль\"/>\r\n      \r\n        <button class=\"login-form-button\" id=\"login-button\">${\r\n          isLoginMode ? \"Войти\" : \"Перейти к регистрации\"\r\n        }</button>\r\n\r\n        <button class=\"login-button\" id=\"toggle-button\">${\r\n          isLoginMode ? \"Перейти к регистрации\" : \"Войти\"\r\n        }</button>`;\r\n\r\n    appEl.innerHTML = appHtml;\r\n\r\n    document.getElementById(\"login-button\").addEventListener(\"click\", () => {\r\n      if (isLoginMode) {\r\n        const login = document.getElementById(\"login-input\");\r\n        const password = document.getElementById(\"password-input\");\r\n\r\n        login.classList.remove(\"error\");\r\n\r\n        if (login.value == \"\") {\r\n          login.classList.add(\"error\");\r\n          return;\r\n        }\r\n\r\n        password.classList.remove(\"error\");\r\n\r\n        if (password.value == \"\") {\r\n          password.classList.add(\"error\");\r\n          return;\r\n        }\r\n\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.loginUser)({\r\n          login: login.value,\r\n          password: password.value,\r\n        })\r\n          .then((user) => {\r\n            setToken(`Bearer ${user.user.token}`);\r\n            name = user.user.name;\r\n            getComments();\r\n          })\r\n          .catch((error) => {\r\n            alert(error.message);\r\n          });\r\n      } else {\r\n        const login = document.getElementById(\"login-input\");\r\n        const name = document.getElementById(\"name-input\");\r\n        const password = document.getElementById(\"password-input\");\r\n\r\n        login.classList.remove(\"error\");\r\n\r\n        if (login.value == \"\") {\r\n          login.classList.add(\"error\");\r\n          return;\r\n        }\r\n\r\n        password.classList.remove(\"error\");\r\n\r\n        if (password.value == \"\") {\r\n          password.classList.add(\"error\");\r\n          return;\r\n        }\r\n\r\n        name.classList.remove(\"error\");\r\n\r\n        if (name.value == \"\") {\r\n          name.classList.add(\"error\");\r\n          return;\r\n        }\r\n\r\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.registerUser)({\r\n          login: login.value,\r\n          password: password.value,\r\n          name: name.value,\r\n        })\r\n          .then((user) => {\r\n            setToken(`Bearer ${user.user.token}`);\r\n            getComments();\r\n          })\r\n          .catch((error) => {\r\n            alert(error.message);\r\n          });\r\n      }\r\n    });\r\n\r\n    document.getElementById(\"toggle-button\").addEventListener(\"click\", () => {\r\n      isLoginMode = !isLoginMode;\r\n      renderForm();\r\n    });\r\n  };\r\n\r\n  renderForm();\r\n}\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./components/login-components.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _components_login_components_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/login-components.js */ \"./components/login-components.js\");\n\r\n\r\n\r\n// let token = \"Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k\";\r\nlet token = null;\r\nlet comments = [];\r\nlet loadingComments = true;\r\nlet isLoadingAdd = false;\r\n\r\nfunction normalDate(date) {\r\n  const year = date.getFullYear().toString().slice(-2);\r\n  const month = (\"0\" + (date.getMonth() + 1)).slice(-2);\r\n  const day = (\"0\" + date.getDate()).slice(-2);\r\n  const hours = (\"0\" + date.getHours()).slice(-2);\r\n  const minutes = (\"0\" + date.getMinutes()).slice(-2);\r\n  return `${day}.${month}.${year} ${hours}:${minutes}`;\r\n}\r\n\r\nconst getComments = async () => {\r\n  renderApp(loadingComments);\r\n  return (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getAndRender)({ token })\r\n    .then((responseData) => {\r\n      const appComments = responseData.comments.map((comment) => {\r\n        return {\r\n          name: comment.author.name,\r\n          date: new Date(comment.date),\r\n          text: comment.text,\r\n          likes: comment.likes,\r\n          isLiked: comment.isLiked,\r\n          isLikeLoading: false,\r\n        };\r\n      });\r\n      comments = appComments;\r\n      loadingComments = false;\r\n      renderApp(loadingComments);\r\n    })\r\n    .catch((error) => {\r\n      alert(error.message);\r\n    });\r\n};\r\n\r\nconst renderForm = (isLoading) => {\r\n  const formWindow = document.querySelector(\".add-form\");\r\n  const loaderText = document.getElementById(\"loader\");\r\n\r\n  if (isLoading) {\r\n    loaderText.classList.remove(\"hidden\");\r\n    formWindow.classList.add(\"hidden\");\r\n  } else {\r\n    loaderText.classList.add(\"hidden\");\r\n    formWindow.classList.remove(\"hidden\");\r\n  }\r\n};\r\n\r\nconst renderApp = (loadingComments) => {\r\n  const appEl = document.getElementById(\"app\");\r\n\r\n  const commentsHTML = comments\r\n    .map((comment, index) => {\r\n      const formattedDate = normalDate(new Date(comment.date));\r\n      return `<li class=\"comment\" data-index='${index}'>\r\n            <div class=\"comment-header\">\r\n              <div>${comment.name}</div>\r\n              <div>${formattedDate}</div>\r\n            </div>\r\n            <div class=\"comment-body\">\r\n              <div class=\"comment-text\">\r\n                ${comment.text\r\n                  .replaceAll(\"QUOTE_BEGIN\", \"<div class='quote'>\")\r\n                  .replaceAll(\"QUOTE_END\", \"</div>\")}\r\n              </div>\r\n            </div>\r\n            <div class=\"comment-footer\">\r\n              <!--<button class=\"edit-button\">Редактировать</button> -->\r\n              <div class=\"likes\">\r\n                <span class=\"likes-counter\">${comment.likes}</span>\r\n                <button data-index='${index}' class=\"like-button ${\r\n                  comment.isLiked ? \"-active-like\" : \"\"\r\n                } ${comment.isLikeLoading ? \"-loading-like\" : \"\"}\"></button>\r\n              </div>\r\n            </div>\r\n          </li>`;\r\n    })\r\n    .join(\"\");\r\n\r\n  if (!token) {\r\n    const appHtml = `\r\n                    <ul class=\"comments\">\r\n                            ${\r\n                              loadingComments\r\n                                ? \"<p>Пожалуйста подождите, комментарии загружаются...</p>\"\r\n                                : \"\"\r\n                            }\r\n                            ${commentsHTML}\r\n                        </ul>\r\n                        <p class=\"warning\">Чтобы добавить комментарий, <button class=\"login-button\">авторизуйтесь</button></p>\r\n                    `;\r\n\r\n    appEl.innerHTML = appHtml;\r\n    document.querySelector(\".login-button\").addEventListener(\"click\", () => {\r\n      (0,_components_login_components_js__WEBPACK_IMPORTED_MODULE_1__.renderLoginComponent)({\r\n        appEl,\r\n        setToken: (newToken) => {\r\n          token = newToken;\r\n        },\r\n        getComments,\r\n      });\r\n    });\r\n\r\n    return;\r\n  }\r\n\r\n  const appHtml = `\r\n                <ul class=\"comments\">\r\n                        ${\r\n                          loadingComments\r\n                            ? \"<p>Пожалуйста подождите, комментарии загружаются...</p>\"\r\n                            : \"\"\r\n                        }\r\n                        ${commentsHTML}\r\n                    </ul>\r\n                    <div class=\"add-form\">\r\n                        <input\r\n                        type=\"text\"\r\n                        class=\"add-form-name\"\r\n                        placeholder=\"Введите ваше имя\"\r\n                        oninput=\"\"\r\n                        />\r\n                        <textarea\r\n                        type=\"textarea\"\r\n                        class=\"add-form-text\"\r\n                        placeholder=\"Введите ваш коментарий\"\r\n                        rows=\"4\"\r\n                        oninput=\"\"\r\n                        ></textarea>\r\n                        <div class=\"add-form-row\">\r\n                        <button class=\"add-form-button\" id=\"button-add\">Написать</button>\r\n                        </div>\r\n                    </div>\r\n\r\n                    <div class=\"loading-comment hidden\" id=\"loader\">\r\n                        Комментарий добавляется...\r\n                    </div>\r\n                `;\r\n\r\n  appEl.innerHTML = appHtml;\r\n\r\n  const buttonComments = document.querySelector(\".add-form-button\");\r\n  const nameInputElement = document.querySelector(\".add-form-name\");\r\n  const textInputElement = document.querySelector(\".add-form-text\");\r\n  buttonComments.disabled = true;\r\n\r\n  nameInputElement.value = _components_login_components_js__WEBPACK_IMPORTED_MODULE_1__.name;\r\n  nameInputElement.disabled = true;\r\n\r\n  textInputElement.addEventListener(\"input\", () => {\r\n    buttonComments.disabled = false;\r\n  });\r\n\r\n  buttonComments.addEventListener(\"click\", () => {\r\n    textInputElement.classList.remove(\"error\");\r\n\r\n    isLoadingAdd = true;\r\n    renderForm(isLoadingAdd);\r\n\r\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.addComment)({\r\n      text: textInputElement.value\r\n        .replaceAll(\"&\", \"&amp;\")\r\n        .replaceAll(\"<\", \"&lt;\")\r\n        .replaceAll(\">\", \"&gt;\")\r\n        .replaceAll('\"', \"&quot;\"),\r\n      token,\r\n    })\r\n      .then(() => {\r\n        return getComments();\r\n      })\r\n      .then(() => {\r\n        isLoadingAdd = false;\r\n        renderForm(isLoadingAdd);\r\n        textInputElement.value = \"\";\r\n      })\r\n      .catch((error) => {\r\n        isLoadingAdd = false;\r\n        renderForm(isLoadingAdd);\r\n        alert(error.message);\r\n      });\r\n  });\r\n\r\n  buttonComments.disabled = true;\r\n  buttonComments.classList.add(\"empty\");\r\n  textInputElement.addEventListener(\"input\", handleInput);\r\n  function handleInput() {\r\n    if (textInputElement.value.trim() !== \"\") {\r\n      buttonComments.disabled = false;\r\n      buttonComments.classList.remove(\"empty\");\r\n    } else {\r\n      buttonComments.disabled = true;\r\n      buttonComments.classList.add(\"empty\");\r\n    }\r\n  }\r\n\r\n  likeTheComments(comments);\r\n  answerComments(comments);\r\n};\r\n\r\ngetComments();\r\n\r\nconst answerComments = (comments) => {\r\n  const oldComments = document.querySelectorAll(\".comment\");\r\n\r\n  const textInputElement = document.querySelector(\".add-form-text\");\r\n\r\n  oldComments.forEach((oldElement) => {\r\n    oldElement.addEventListener(\"click\", () => {\r\n      const index = oldElement.dataset.index;\r\n\r\n      textInputElement.value = `QUOTE_BEGIN ${comments[index].text}\\n${comments[index].name} QUOTE_END`;\r\n    });\r\n  });\r\n};\r\n\r\nfunction delay(interval = 300) {\r\n  return new Promise((resolve) => {\r\n    setTimeout(() => {\r\n      resolve();\r\n    }, interval);\r\n  });\r\n}\r\n\r\nfunction likeTheComments() {\r\n  const likesButtonElements = document.querySelectorAll(\".like-button\");\r\n\r\n  likesButtonElements.forEach((likesButtonElement) => {\r\n    likesButtonElement.addEventListener(\"click\", (event) => {\r\n      event.stopPropagation();\r\n      const index = likesButtonElement.dataset.index;\r\n      const comment = comments[index];\r\n\r\n      comment.isLikeLoading = true;\r\n      renderApp();\r\n      delay(1000).then(() => {\r\n        comment.isLiked = !comment.isLiked;\r\n        likesButtonElement.classList.toggle(\"-active-like\");\r\n        comment.likes = comment.isLiked ? ++comment.likes : --comment.likes;\r\n        comment.isLikeLoading = false;\r\n        renderApp();\r\n      });\r\n    });\r\n  });\r\n}\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;