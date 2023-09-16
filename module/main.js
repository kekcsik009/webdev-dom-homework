
// ------------------
"use strict";
// Добавляем ДОМ элементы
import { getComments, comments, btnElement, inputName, inputText, addComment} from "./api.js";
import { renderComments, eventErrors, addLike, answerComment } from "./render.js";
import { addDate } from "./func.js";
// import { inputName, inputText} from "./api.js"



const formBg = document.querySelector('.add-form'); 
let textAnswerHtml = "";
let indexOld = 0;

// Получаем список комментариев с API
getComments();

// Вспомогательные функции
// --Добавляем дату--
// Выделение ошибки
const btnErrAdd = () => {
    btnElement.classList.add("btn-error");
    setTimeout(() =>{
        btnElement.classList.remove("btn-error");
    },500)
}

// Функция добавления лайка
   
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