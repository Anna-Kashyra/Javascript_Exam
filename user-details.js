// На сторінці user-details.html:
// 4 Вивести всю без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку з'являються title всіх постів поточного юзера
// (для отримання постів використовуйте ендпоінт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Кожному посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html,
// котра має детальну інфу про поточний пост.

// document.addEventListener('DOMContentLoaded', () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const userId = urlParams.get('userId');
//
//     fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
//         .then(response => response.json())
//         .then(user => {
//             const userDetailsContainer = document.getElementsByClassName('user-details-container')[0];
//             userDetailsContainer.innerHTML = '';
//
//             // Функція для виведення всіх полів об'єкта user
//             function createUserDetails(obj, parentElement, level = 0) {
//                 for (const key in obj) {
//                     const value = obj[key];
//                     const element = document.createElement('div');
//                     element.classList.add(`${key}-elem`);
//
//                     const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
//
//                     if (typeof value === 'object' && value !== null) {
//                         // Якщо значення - об'єкт, виводимо його елементи також
//                         element.innerHTML = `<strong>${capitalizedKey}:</strong>`;
//                         parentElement.appendChild(element);
//
//                         const nestedContainer = document.createElement('div');
//                         nestedContainer.classList.add(`${key}-container`);
//                         element.appendChild(nestedContainer);
//
//                         createUserDetails(value, nestedContainer, level + 1);
//                     } else {
//                         // Якщо значення - це не об'єкт, виводимо ключ і значення
//                         element.innerHTML = `<strong>${capitalizedKey}:</strong> ${value}`;
//                         parentElement.appendChild(element);
//                     }
//
//                 }
//             }
//
//             createUserDetails(user, userDetailsContainer);
//         })
//         .catch(error => console.error('Error fetching user details:', error));
//
//
//     document.getElementById('load-posts-btn').addEventListener('click', () => {
//         fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
//             .then(response => response.json())
//             .then(posts => {
//                 const postsContainer = document.getElementsByClassName('posts-container')[0];
//                 postsContainer.innerHTML = '';
//                 for (const post of posts) {
//                     const postBlock = document.createElement('div');
//                     postBlock.classList.add('post-block');
//
//                     const capitalizeTitle = post.title.charAt(0).toUpperCase() + post.title.slice(1);
//                     postBlock.innerHTML = `<h3 class="post-title">${capitalizeTitle}</h3>
//                                            <a class="view-post" href="post-details.html?postId=${post.id}">View Post Details</a>`;
//                     postsContainer.appendChild(postBlock);
//                 }
//                 // posts.forEach(post => {
//                 //     const postBlock = document.createElement('div');
//                 //     postBlock.innerHTML = `<p><strong>Title:</strong> ${post.title}</p>
//                 //                            <a class="view-post" href="post-details.html?postId=${post.id}">View Post Details</a>`;
//                 //     postsContainer.appendChild(postBlock);
//                 // });
//             })
//             .catch(error => console.error('Error fetching posts:', error));
//     });
// });


document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');

    //Отримання даних юзера
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = await userResponse.json();

    const userDetailsContainer = document.getElementsByClassName('user-details-container')[0];
    userDetailsContainer.innerHTML = '';

    // Виведення всіх полів об'єкта user
    function createUserDetails(obj, parentElement, level = 0) {
                for (const key in obj) {
                    const value = obj[key];
                    const element = document.createElement('div');
                    element.classList.add(`${key}-elem`);

                    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

                    if (typeof value === 'object' && value !== null) {
                        // Якщо значення - об'єкт, виводимо його елементи також
                        element.innerHTML = `<strong>${capitalizedKey}:</strong>`;
                        parentElement.appendChild(element);

                        const nestedContainer = document.createElement('div');
                        nestedContainer.classList.add(`${key}-container`);
                        element.appendChild(nestedContainer);

                        createUserDetails(value, nestedContainer, level + 1);
                    } else {
                        // Якщо значення - це не об'єкт, виводимо ключ і значення
                        element.innerHTML = `<strong>${capitalizedKey}:</strong> ${value}`;
                        parentElement.appendChild(element);
                    }
                }
            }

            createUserDetails(user, userDetailsContainer);

    // Отримання постів
    const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
    const posts = await postsResponse.json();

    // Завантаження постів по кліку
    document.getElementById('load-posts-btn').addEventListener('click', () => {
        const postsContainer = document.getElementsByClassName('posts-container')[0];
        postsContainer.innerHTML = '';

        for (const post of posts) {
            const postBlock = document.createElement('div');
            postBlock.classList.add('post-block');

            const capitalizeTitle = post.title.charAt(0).toUpperCase() + post.title.slice(1);
            postBlock.innerHTML = `<h3 class="post-title">${capitalizeTitle}</h3>
                                   <a class="view-post" href="post-details.html?postId=${post.id}">View Post Details</a>`;
            postsContainer.appendChild(postBlock);
        }
    });
});

