// На сторінці post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули.
// 8 Нижче інформації про пост, вивести всі коментарі поточного поста
// (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)

// document.addEventListener('DOMContentLoaded', () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const postId = urlParams.get('postId');
//
//     fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
//         .then(response => response.json())
//         .then(post => {
//             const postDetailsContainer = document.getElementsByClassName('post-details-container')[0];
//             postDetailsContainer.innerHTML = `<div class="post-details-info">
//                                                 <p><strong>User Id:</strong> ${post.userId}</p>
//                                                 <p><strong>Id:</strong> ${post.id}</p>
//                                               </div>
//                                               <h3 class="post-title">${post.title}</h3>
//                                               <p>${post.body}</p>`;
//
//             // Інший спосіб
//             // for (const key in post) {
//             //     const element = document.createElement('p');
//             //     const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
//             //     element.innerHTML = `<strong>${capitalizedKey}:</strong> ${post[key]}`;
//             //     postDetailsContainer.appendChild(element);
//             // }
//         })
//         .catch(error => console.error('Error fetching post details:', error));
//
//     fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
//         .then(response => response.json())
//         .then(comments => {
//             const commentsContainer = document.getElementsByClassName('comments-container')[0];
//             comments.forEach(comment => {
//                 const commentBlock = document.createElement('div');
//                 commentBlock.classList.add('comment-block');
//
//                 for (const key in comment) {
//                     const element = document.createElement('p');
//                     element.classList.add(`${key}-comment`);
//                     const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
//                     element.innerHTML = `<strong>${capitalizedKey}:</strong> ${comment[key]}`;
//                     commentBlock.appendChild(element);
//                 }
//                 // Інший спосіб
//                 // commentBlock.innerHTML = `<p><strong>Name:</strong> ${comment.name}</p>
//                 //                           <p><strong>Email:</strong> ${comment.email}</p>
//                 //                           <p class="comment-body"><strong>Comment:</strong> ${comment.body}</p>`;
//
//                 commentsContainer.appendChild(commentBlock);
//             });
//         })
//         .catch(error => console.error('Error fetching comments:', error));
// });

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postId');

    const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = await postResponse.json();

    const postDetailsContainer = document.getElementsByClassName('post-details-container')[0];
    postDetailsContainer.innerHTML = `<div class="post-details-info">
                                        <p><strong>User Id:</strong> ${post.userId}</p>
                                        <p><strong>Id:</strong> ${post.id}</p>
                                      </div>
                                      <h3 class="post-title">${post.title}</h3>
                                      <p>${post.body}</p>`;


    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    const comments = await commentsResponse.json();

    const commentsContainer = document.getElementsByClassName('comments-container')[0];
    comments.forEach(comment => {
        const commentBlock = document.createElement('div');
        commentBlock.classList.add('comment-block');

        for (const key in comment) {
            const element = document.createElement('p');
            element.classList.add(`${key}-comment`);
            const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
            element.innerHTML = `<strong>${capitalizedKey}:</strong> ${comment[key]}`;
            commentBlock.appendChild(element);
        }
        commentsContainer.appendChild(commentBlock);
    });
});

