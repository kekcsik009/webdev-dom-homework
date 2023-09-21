// import { comments, getComments } from "./api.js";
// import { renderComments } from "./render.js";
// // Функция редактирования комментария
// export const clickEventEditComment = () => {
//     const redirectElements = document.querySelectorAll(".red");
//     redirectElements.forEach((redirectElement, indexEl) => {
//         redirectElement.addEventListener('click', (e) => {
//             e.stopPropagation();
//             const index = redirectElement.dataset.index;
//             const comment =  comments[index];
//             if (comment.isEdit) {
//                 const edit = document.querySelector('.add-edit');
//                 comment.text = edit.value;
//                 if (comment.text.length === 0) {
//                     comments.splice(index,1);
//                 }
//                 comment.isEdit = false;
//             } else {
//                 comment.isEdit = true;
//             }
//             renderComments();
//         })
//     })
// }
