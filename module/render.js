// import { comments, getComments} from "./api.js"
// import { clickEventEditComment } from "./edit.js";
// import { addDate } from "./func.js";
// const likeElement = document.getElementsByClassName("like-button");
// // Рендер

// const getLikeClass = (element) => {
//     return element ? "like-button -active-like" : "like-button";
// }
// // Добавляем исключения
// export const eventErrors = (element) => {
//     return element
//         .replaceAll("&", "&amp;")
//         .replaceAll("<", "&lt;")
//         .replaceAll(">", "&gt;")
//         .replaceAll('"', "&quot;")
//         .replaceAll('QUOTE_BEGIN', "")
//         .replaceAll('QUOTE_END', "")
// } 

// export const renderComments = () => {

//     const commentatorsHtml = comments.map((commentator, index) => {
//         const edit = commentator.isEdit;
//         return `<li class="comment ${commentator.animationClass}" data-index="${index}">
//         <i class='bx bx-x del ' data-index="${index}" ></i>
//       <div class="comment-header" >
//         <div>${eventErrors(commentator.name)}</div>
//         <div>${addDate(new Date(commentator.date))}</div>
//       </div>
//       <div class="comment-body">
            
      
//       ${edit ? `<textarea type="textarea" class="add-form-text add-edit" placeholder="Введите ваш коментарий" rows="4">${commentator.text}</textarea>` : `<div class="comment-text">${commentator.text}</div>`}
//       <div class="comment-footer comment-footer_new">
//         ${commentator.isReduction ? '' : `<button  class="add-form-button red" data-index="${index}" >Редактировать</button>`}
//         <div class="likes">
//           <span class="likes-counter">${commentator.likes}</span>
          
//           <button class="${getLikeClass(commentator.LikeActive)}"></button>
//         </div>
//       </div>
//     </li>`;
//     }).join("");
//     document.getElementById("commentsId").innerHTML = commentatorsHtml;
//     commentDel();
//     addLike();
//     clickEventEditComment();
//     answerComment();
// };


// // Крестик
// const getDelCard = (element) => {
//     setTimeout(() => {
//     element.classList.add('del-card');
//     }, 300)
//     element.classList.remove('del');
//     element.classList.add('exet-del');
// }
// // Удаляем комент
// const commentDel = () => {
//     const btnFormElement = document.querySelectorAll(".del");
//     // console.log(btnFormElement);
//     btnFormElement.forEach((element) => {
//         element.addEventListener('click', (e) => {
//             e.stopPropagation();
//             getDelCard(element);
//             setTimeout(() => {
//                 const indexElement = element.dataset.index;
//                 comments.splice(indexElement, 1);
//                 renderComments()
//             },800)
//         })
//     })
// }

// export function addLike () {
//     Array.from(likeElement).forEach((element,index) => {
//         element.addEventListener('click', (e) => {
//             e.stopPropagation();
//             const commentator = comments[index];
//             if (commentator.LikeActive === true) {
//                 commentator.LikeActive = false;
//                 commentator.likes -= 1;
//                 renderComments();
                
//             } else {
//                 commentator.LikeActive = true;
//                 commentator.likes += 1;
//                 renderComments()
//             }
//         })
//     })
// }

// export function answerComment() {
//     const oldComments = document.querySelectorAll(".comment");
//     for (let oldComment of oldComments) {
//       oldComment.addEventListener("click", (event) => {
//         event.stopPropagation();
//         const index = oldComment.dataset.index;
//         const comment = comments[index];
//         // eventErrors(comment);
//         inputText.value =` ${comment.text}\n${comment.name} `;
//       });
//     }
//   }
  
   