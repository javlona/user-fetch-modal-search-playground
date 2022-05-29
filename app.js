let cardHolder = document.querySelector('[data-id="card-holder"]');
let modal = document.querySelector('[data-id="modal"]');
let url = "https://jsonplaceholder.typicode.com/users";
let results = document.querySelector('[data-id="result"]');

let countApiCalls = 0;

function getUsers() {
  fetch(url)
    .then((response) => response.json())
    .then((users) => {
      createCards(users);
    })
    .catch((err) => console.log(err));
}

function createCards(data) {
  data.forEach((user) => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", `${user.id}`);
    card.innerHTML = `
            <h3>${user.name}</h3>
            <p>${user.email}</p>
            <p>${user.phone}</p>
            <p>${user.website}</p>
            `;
    cardHolder.appendChild(card);
  });
}

function getUserInfo(id) {
  fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((user) => {
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
                `;
      modal.classList.add("show");
    });
}

function search(e) {
  let searchValue = e.target.value;
  console.log(searchValue, e.target.value);
  if (e.target.value.length > 0 && e.target.value.length !== searchValue) {
    results.innerHTML = "";
    fetch(url)
      .then((response) => response.json())
      .then((users) => {
        console.log(users);
        users.forEach((user) => {
          if (user.name.toLowerCase().includes(e.target.value.toLowerCase())) {
            let li = document.createElement("li");
            li.innerHTML = `${user.name}`;
            li.classList.add("search-result");
            li.setAttribute("data-id", `${user.id}`);
            results.classList.add("show");
            results.appendChild(li);
          }
        });
        console.log("api called", countApiCalls++);
      });
  } else {
    closeSearchResults();
  }
}

function closeSearchResults() {
  results.classList.remove("show");
  results.innerHTML = ``;
}

function closeHandler(e) {
  e.stopPropagation();
  console.log(e, "close");
  modal.classList.remove("show");
}

function debounce(fn, delay) {
  let timer;
  return function () {
    let context = this;
    let args = arguments;
    
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

const searchDebounced = debounce(search, 500);

getUsers();

window.addEventListener("click", (e) => {
  if (modal.classList.contains("show")) {
    if (e.target.dataset.id === "modal") {
      closeHandler(e);
    }
  }
  if (results.classList.contains("show")) {
    closeSearchResults();
  }
});

cardHolder.addEventListener("click", function (e) {
  if (e.target.classList.contains("card")) {
    let id = e.target.getAttribute("data-id");
    getUserInfo(id);
  }
});

results.addEventListener("click", function (e) {
  if (e.target.classList.contains("search-result")) {
    let id = e.target.getAttribute("data-id");
    getUserInfo(id);
  }
});

window.closeHandler = closeHandler;
