import { comments, getComments} from "./api.js"
import { clickEventEditComment } from "./edit.js";
import { addLike, addDate, cardElements, answerComment, commentDel} from "./main.js";

getComments();
// Рендер

const getLikeClass = (element) => {
    return element ? "like-button -active-like" : "like-button";
}
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

export const renderComments = () => {

    const commentatorsHtml = comments.map((commentator, index) => {
        const edit = commentator.isEdit;
        return `<li class="comment ${commentator.animationClass}" data-index="${index}">
        <i class='bx bx-x del ' data-index="${index}" ></i>
      <div class="comment-header" >
        <div>${eventErrors(commentator.name)}</div>
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
};


