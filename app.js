let cardHolder = document.querySelector('[data-id="card-holder"]');
let modal = document.querySelector('[data-id="modal"]');

cardHolder.addEventListener('click', function(e) {
    if (e.target.classList.contains('card')) {
        let id = e.target.getAttribute('data-card-id');
        getUserInfo(id);
    }
})

let url = 'https://jsonplaceholder.typicode.com/users';

function getUsers() {

    fetch(url)
        .then(response => response.json())
        .then(users => {
            console.log(users);
            users.forEach(user => {
                let card = document.createElement('div');
                card.classList.add('card');
                card.setAttribute('data-card-id', `${user.id}`);
                card.innerHTML = `
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                    <p>${user.phone}</p>
                    <p>${user.website}</p>
                    `
                cardHolder.appendChild(card);
                })      
        })
        .catch(err => console.log(err));
}

function getUserInfo(id) {
    fetch(`${url}/${id}`)
        .then(response => response.json())
        .then(user => {
            modal.innerHTML = `
            <div class="modal-content">
                <h3>${user.name}</h3>
                <p>${user.email}</p>
                <p>${user.phone}</p>
                <p>${user.website}</p>
                <button class="modal-close" onclick="closeHandler(event)">x</button>
            </div>
                `
            modal.classList.add('show');

        })
}

function closeHandler(e) {
    e.stopPropagation();
    console.log(e, 'close');
    modal.classList.remove('show');
}

getUsers();
window.closeHandler = closeHandler