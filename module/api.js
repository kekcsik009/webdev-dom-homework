import { renderComments} from "./render.js";

let loadVars = true;
const apiUrl = "https://wedev-api.sky.pro/api/v1/kekcsik1/comments";
const pLoad = document.getElementById("commentsLoad");
export let comments = [];
export const btnElement = document.getElementById("btnId");
export const inputName = document.getElementById("nameTextId");
export const inputText = document.getElementById("commentTextId");

// Получаем список коментариев с API
export const getComments = () => {
    if (loadVars) {
        document.getElementById("commentsId").innerHTML =
        `<div class="preloader">
        <div class="preloader__image">
        </div>
        </div>`;
        document.querySelector(".add-form").style.display = "none";
        document.querySelector(".add-form-row").style.display = "none";
    }
    fetch(apiUrl, { 
    method: "GET",})
    .then((response) => { response.json()
        .then((responseData) => {
            const appComments = responseData.comments.map((comments) => { 
                return { 
                  date: new Date(comments.date), 
                  name: comments.author.name, //author
                  text: comments.text, 
                  likes: comments.likes, 
                  isLiked: false, }; 
                }); 
                comments = appComments;
                loadVars = false; 
                renderComments();
                pLoad.textContent = "";
                btnElement.disabled = false;
                btnElement.textContent = "Написать";
            })  
                
                }) .then(() => {
                    document.querySelector(".form-loading").style.display = "none";
                    document.querySelector(".add-form").style.display = "block";
                    document.querySelector(".add-form-row").style.display = "block";
                }); 
    };

getComments();

// Добавляем комментарий
export const addComment = () => {
   
    btnElement.disabled = true;
    fetch(apiUrl,
    {   
      method: 'POST',
      body: JSON.stringify({
        name: inputName.value,
        text: inputText.value, 
        datе: new Date(),
        forceError: false,
      }),
    })
    .then((response) => {
        if (response.status === 500) {
          return Promise.reject(500);
        }
        if (response.status === 400) {
          return Promise.reject(400);
        }
      })
    .then (() => {
        getComments();
    })
      .catch((error) => {
        btnElement.disabled = false;
        if (error === 500) {
            alert("Сервер сломался, попробуй позже");
            return;
        }
        if (error === 400) {
            alert("Имя и комментарий должны быть не короче 3 символов");
            return;
        }
        alert('Кажется, у Вас сломался интернет');
      }); 
}

