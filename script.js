
// ------------------
"use strict";
// Добавляем ДОМ элементы
let comments = [];
const cardElements = document.getElementById("commentsId");
const btnElement = document.getElementById("btnId");
const pLoad = document.getElementById("commentsLoad")
const inputName = document.getElementById("nameTextId");
const inputText = document.getElementById("commentTextId");
const likeElement = document.getElementsByClassName("like-button");
const formBg = document.querySelector('.add-form'); 
let textAnswerHtml = "";
let indexOld = 0;
let loadVars = true;
const apiUrl = "https://wedev-api.sky.pro/api/v1/kekcsik1/comments";
// Получаем список комментариев с API
const getComments = () => {
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

// Вспомогательные функции
// --Добавляем дату--
const addDate = () =>{
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
const commentDel = () => {
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
function addLike () {
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

// Рендер
const getLikeClass = (element) => {
    return element ? "like-button -active-like" : "like-button";
}
function renderComments () {

    const commentatorsHtml = comments.map((commentator, index) => {
        const edit = commentator.isEdit;
        return `<li class="comment ${commentator.animationClass}" data-index="${index}">
        <i class='bx bx-x del ' data-index="${index}" ></i>
      <div class="comment-header" >
        <div>${commentator.name}</div>
        <div>${addDate(new Date(commentator.date))}</div>
      </div>
      <div class="comment-body">
            
      
      ${edit ? `<textarea type="textarea" class="add-form-text add-edit" placeholder="Введите ваш коментарий" rows="4">${commentator.text}</textarea>` : `<div class="comment-text">${commentator.text}</div>`}
      <div class="comment-footer comment-footer_new">
        ${commentator.isReduction ? '' : `<button  class="add-form-button red" data-index="${index}" >Редактировать</button>`}
        <div class="likes">
          <span class="likes-counter">${commentator.likes}</span>
          
          <button class="${getLikeClass(commentator.LikeActive)}"></button>
        </div>
      </div>
    </li>`;
    }).join("");
    cardElements.innerHTML = commentatorsHtml;
    commentDel();
    addLike();
    clickEventEditComment();
    answerComment();
}
// Функция редактирования комментария
const clickEventEditComment = () => {
    const redirectElements = document.querySelectorAll(".red");
    redirectElements.forEach((redirectElement, indexEl) => {
        redirectElement.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = redirectElement.dataset.index;
            const comment =  comments[index];
            if (comment.isEdit) {
                const edit = document.querySelector('.add-edit');
                comment.text = edit.value;
                if (comment.text.length === 0) {
                    comments.splice(index,1);
                }
                comment.isEdit = false;
            } else {
                comment.isEdit = true;
            }
            renderComments();
        })
    })
}

renderComments();
// Добавляем исключения
const eventErrors = (element) => {
    return element
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll('QUOTE_BEGIN', "")
        .replaceAll('QUOTE_END', "")
} 

function answerComment() {
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
    const addComment = () => {
   
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
    //   .then((responseData) => {
    //     comments = responseData.comment;
    //     btnElement.disabled = false;
    //     btnElement.textContent = "Элемент добавлятся...";
    //   })
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
renderComments();

    // comments[comments.length - 1].animationClass = "";
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


