let cardHolder = document.querySelector('[data-id="card-holder"]');
let modal = document.querySelector('[data-id="modal"]');
let url = 'https://jsonplaceholder.typicode.com/users';
let results = document.querySelector('[data-id="result"]');

let countApiCalls = 0;
let data = [];

function search(e) {
    if(e.target.value.length > 0) {
    fetch(url)
        .then(response => response.json())
        .then(users => {
            console.log(users);
            users.forEach(user => {
                if(user.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                    let li = document.createElement('li');
                    li.innerHTML = `${user.name}`;
                    li.setAttribute('data-res-id', `${user.id}`);
                    results.classList.add('active');
                    results.appendChild(li);
                }
            })
    console.log('api called', countApiCalls++);
    })
    } else {
        results.classList.remove('active');
        document.querySelector('[data-id="result"]').innerHTML = '';
    }
}
function debounce(fn, delay) {
    let timer;
    return function (e) {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    }
}

const searchDebounced = debounce(search, 500);

function getUsers() {
    fetch(url)
        .then(response => response.json())
        .then(users => {
            createCards(users);
        })
        .catch(err => console.log(err));
}

function createCards(data) {
    data.forEach(user => {
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
                <p>${user.address.street}</p>
                <p>${user.address.suite}</p>
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

window.addEventListener('DomContentLoaded', () => {
    createCards(data)})

cardHolder.addEventListener('click', function(e) {
    if (e.target.classList.contains('card')) {
        let id = e.target.getAttribute('data-card-id');
        getUserInfo(id);
    }
})

window.closeHandler = closeHandler