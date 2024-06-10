document.addEventListener('DOMContentLoaded', () => {
document.addEventListener('click', e=>{
    if (e.target.classList.contains('button__delete')){
        const book= e.target.closest('.container__listAll')
        const bookId= book.getAttribute('data-id')
        fetch(`/books/id/${bookId}`, {
            method: 'DELETE'
        })
        .then(res => {
            if (res.ok){
                book.remove();
            }else{
                console.error('Dailed to delete book');
            }
        })
        .catch(error=>console.error('Failed to delete book:', error));
        }
    });
});
// document.addEventListener('DOMContentLoaded', () => {
//     document.addEventListener('click', e=>{
//         if (e.target.classList.contains('button__delete')){
//             const book= e.target.closest('.book__content')
//             const bookId= book.getAttribute('data-id')
//             fetch(`/books/id/${bookId}`, {
//                 method: 'DELETE'
//             })
//             .then(res => {
//                 if (res.ok){
//                     book.remove();
//                 }else{
//                     console.error('Dailed to delete book');
//                 }
//             })
//             .catch(error=>console.error('Failed to delete book:', error));
//             }
//         });
//     });

//     document.addEventListener('DOMContentLoaded', () => {
//         document.addEventListener('click', e=>{
//             if (e.target.classList.contains('button__delete')){
//                 const book= e.target.closest('.book__content')
//                 const bookCategory= book.getAttribute('data-category')
//                 fetch(`/books/id/${bookCategory}`, {
//                     method: 'DELETE'
//                 })
//                 .then(res => {
//                     if (res.ok){
//                         book.remove();
//                     }else{
//                         console.error('Dailed to delete book');
//                     }
//                 })
//                 .catch(error=>console.error('Failed to delete book:', error));
//                 }
//             });
//         });
//         document.addEventListener('DOMContentLoaded', () => {
//             document.addEventListener('click', e=>{
//                 if (e.target.classList.contains('button__delete')){
//                     const book= e.target.closest('.book__content')
//                     const bookName= book.getAttribute('data-name')
//                     fetch(`/books/id/${bookName}`, {
//                         method: 'DELETE'
//                     })
//                     .then(res => {
//                         if (res.ok){
//                             book.remove();
//                         }else{
//                             console.error('Dailed to delete book');
//                         }
//                     })
//                     .catch(error=>console.error('Failed to delete book:', error));
//                     }
//                 });
//             });
//             document.addEventListener('DOMContentLoaded', () => {
//                 document.addEventListener('click', e=>{
//                     if (e.target.classList.contains('button__delete')){
//                         const book= e.target.closest('.book__content')
//                         const bookAuthor= book.getAttribute('data-author')
//                         fetch(`/books/id/${bookAuthor}`, {
//                             method: 'DELETE'
//                         })
//                         .then(res => {
//                             if (res.ok){
//                                 book.remove();
//                             }else{
//                                 console.error('Dailed to delete book');
//                             }
//                         })
//                         .catch(error=>console.error('Failed to delete book:', error));
//                         }
//                     });
//                 });