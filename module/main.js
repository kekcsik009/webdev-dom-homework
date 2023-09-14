
// ------------------
"use strict";
// Добавляем ДОМ элементы
import { getComments, comments, btnElement, inputName, inputText, addComment  } from "./api.js";
import { renderComments } from "./render.js";
export const cardElements = document.getElementById("commentsId");

const likeElement = document.getElementsByClassName("like-button");
const formBg = document.querySelector('.add-form'); 
let textAnswerHtml = "";
let indexOld = 0;


// Получаем список комментариев с API
getComments();

// Вспомогательные функции
// --Добавляем дату--
export const addDate = () =>{
    const date = new Date();
    let time = {
        hour: 'numeric',
        minute: 'numeric'
    };
    let year = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric'
    }// Выводим дату в нужной для нас форме и русской локализацией
    return  date.toLocaleString("ru", year) + " " + date.toLocaleString('ru', time);
}
// Выделение ошибки
const btnErrAdd = () => {
    btnElement.classList.add("btn-error");
    setTimeout(() =>{
        btnElement.classList.remove("btn-error");
    },500)
}
// Крестик
const getDelCard = (element) => {
    setTimeout(() => {
    element.classList.add('del-card');
    }, 300)
    element.classList.remove('del');
    element.classList.add('exet-del');
}
// Удаляем комент
export const commentDel = () => {
    const btnFormElement = document.querySelectorAll(".del");
    // console.log(btnFormElement);
    btnFormElement.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            getDelCard(element);
            setTimeout(() => {
                const indexElement = element.dataset.index;
                comments.splice(indexElement, 1);
                renderComments()
            },800)
        })
    })
}


// Функция добавления лайка
export function addLike () {
    Array.from(likeElement).forEach((element,index) => {
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            const commentator = comments[index];
            if (commentator.LikeActive === true) {
                commentator.LikeActive = false;
                commentator.likes -= 1;
                renderComments();
                
            } else {
                commentator.LikeActive = true;
                commentator.likes += 1;
                renderComments()
            }
        })
    })
}

export function answerComment() {
    const oldComments = document.querySelectorAll(".comment");
    for (let oldComment of oldComments) {
      oldComment.addEventListener("click", (event) => {
        event.stopPropagation();
        const index = oldComment.dataset.index;
        const comment = comments[index];
        // eventErrors(comment);
        inputText.value =` ${comment.text}\n${comment.name} `;
      });
    }
  }
  
      
// Функция добавления нового комментария
 const clickEventAddComment = () => {
    inputText.classList.remove("error");// очистка
    inputName.classList.remove("error");// класса
    if (inputText.value.length === 0 && inputName.value.length === 0) {
        alert("Введите текст");
        inputName.classList.add("error");
        inputText.classList.add("error");
        btnErrAdd()
        return;
    }
    if (inputName.value.length === 0) {
        alert("Кажется ты забыл ввести Имя");
        inputName.classList.add("error");
        btnErrAdd();
        return;
    }
    if (inputText.value.length === 0) {
        alert("Тут нехватает текста!");
        inputText.classList.add("error");
        btnErrAdd()
        return;
    }
    formBg.classList.remove('comment-new-bg');
    inputText.placeholder = 'Введите ваш коментарий'
    const commentText = document.querySelectorAll('.comment-text');
    const isAnswerTest =  commentText[indexOld].innerText === textAnswerHtml;
    const test = () => isAnswerTest ? textAnswerHtml : "";
    comments.push(
        {
            name: eventErrors(inputName.value),
            text: eventErrors(inputText.value),
            data: addDate(),
            likes: 0,
            animationClass: "comment_animation",
            isQuote: false,
            isAnswers: test(),
            isReduction: true
            }
    )
    addComment();
    renderComments();
} 

    document.getElementById("nameTextId").value = '';
    document.getElementById("commentTextId").value = '';
    textAnswerHtml = ""
    document.addEventListener('keyup', (key) => {
    if(key.code === 'Enter'){
        clickEventAddComment()
    }
    })

btnElement.addEventListener( 'click', () => clickEventAddComment())
console.log("It works!");


