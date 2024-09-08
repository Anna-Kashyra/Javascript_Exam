// На сторінці index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id, name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання, при кліку на яку відбувається перехід  на сторінку user-details.html,
// котра має детальну інформацію про об'єкт на який клікнули

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const usersContainer = document.getElementsByClassName('users-container')[0];
            for (const user of users) {
                const userBlock = document.createElement('div');
                userBlock.classList.add('user-block');
                userBlock.innerHTML = `<p class="user-id">${user.id}</p>
                                       <p class="user-name">${user.name}</p>                                    
                                       <a class="user-details" href="user-details.html?userId=${user.id}">View Details About This User</a>`;
                usersContainer.appendChild(userBlock);
            }
        })
        .catch(error => console.error('Error fetching users:', error));
});

