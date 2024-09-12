const content = document.querySelector(".content");
const themes = document.querySelectorAll("header button");
const addTodo = document.querySelector(".add-todo");
const todoInputValue = document.querySelector(".todo-input");
const todoContainer = document.querySelector(".todos-container");
const popupStatus = document.querySelector(".popup-status");

// Toggle Themes
themes.forEach((btn) => {
  btn.addEventListener("click", () => {
    content.className = `content ${btn.className} `;
  });
});

// << Start Repeattive evnets
// this poup will show after any cahnge in state like (update,delete,check,unCheck) todo
function popupMsg(msg) {
  popupStatus.classList.add("succes");
  popupStatus.innerHTML = `${msg} ✔️`;
  setTimeout(() => {
    popupStatus.classList.remove("succes");
  }, 2000);
}
// This animation will take the className to add it for the todos and we added the animations in css
// and index to get the specfic todo in the container this calss will add to it
function animationStatus(className, index) {
  const todo = document.querySelectorAll(".todos-container .todos")[index];
  todo.classList.add(className);
}

// Handell button state
function handellEmpteyInput(inputName, buttonName) {
  buttonName.style.opacity = "0.5";
  buttonName.style.pointerEvents = "none";

  inputName.addEventListener("input", () => {
    if (inputName.value.trim("") !== "") {
      buttonName.style.opacity = "1";
      buttonName.style.pointerEvents = "auto";
    } else {
      buttonName.style.opacity = "0.5";
      buttonName.style.pointerEvents = "none";
    }
  });
}
handellEmpteyInput(todoInputValue, addTodo);
// End Repeattive evnets // >>

// The all Todos will push here in this array
let todos = [];
addTodo.addEventListener("click", () => {
  // calling handellEmpteyInput after evrey click to not send emptey values
  handellEmpteyInput(todoInputValue, addTodo);

  // Todo object
  let todoObj = {
    // this conditon to see if this is the frist todo or not if not !!
    // we will go for last id and then we will add 1 above it and this will make unique id
    id: todos.length <= 0 ? 1 : todos[todos.length - 1].id + 1,
    title: todoInputValue.value,
    checked: false,
  };

  // Push todos to the main array on evrey click
  todos.push(todoObj);

  // Set todos in local storage in evrey click
  // json.parsse to convert the data to string cuz the local storage don't accept any type of data except string
  localStorage.setItem("todos", JSON.stringify(todos));

  // Show added Task
  showTodos();
  // Remove the input value after add todo to enhance user exprinse
  todoInputValue.value = "";

  popupMsg("Added Successfulley");
  // todos.length - 1 === index of last todo added
  animationStatus("add", todos.length - 1);
});

// Check if there are todos saved in localStorage
if (localStorage.getItem("todos")) {
  // Parse and assign the stored todos to the `todos` variable
  todos = JSON.parse(localStorage.getItem("todos"));
} else {
  // empty array if no todos are found
  todos = [];
}

// Get and show todos after load
function showTodos() {
  //   clear the container at frist to prevent repeatation
  todoContainer.innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    // We add style for checked here when user check the style will inject here
    todoContainer.innerHTML += `
            <div class="todos">
              <p 
              style="text-decoration: ${
                todos[i].checked ? "line-through" : "none"
              }" 
              class="todo-name">
              ${todos[i].title}</p>
              <div class="todo-buttons">

                <button
                onclick="checkTodo(${i})" 
                class="check">✔️</button>
                
                <button 
                onclick="popupUpdate(${i})"
                class="update">✏️</button>
                
                <button
                onclick="deleteTodo(${i})" 
                class="delete">❌</button>

              </div>
            </div>
        `;
  }
}
showTodos();

function checkTodo(index) {
  // ! >>  TO  GIVE US THE OPPESITE OF THE BOLLEN NOW
  todos[index].checked = !todos[index].checked;
  localStorage.setItem("todos", JSON.stringify(todos));
  showTodos();
  popupMsg(`Todo (${index + 1}) Status Changed`);
  animationStatus("checked", index);
}

function popupUpdate(index) {
  const popUp = document.querySelector(".popup.update");
  const popuptodoInputValue = popUp.querySelector("input");
  const editBtn = popUp.querySelector(".edit");
  const taskNum = popUp.querySelector("h2 span");

  popUp.style.display = "flex";
  taskNum.innerHTML = index + 1;
  // Set the todo value to enhance user Experince
  popuptodoInputValue.value = todos[index].title;

  // To prevent edit task with emptey value
  handellEmpteyInput(popuptodoInputValue, editBtn);
  // we used onClick instead of eventListenier
  // cuz if we used eventListenier we supppose to clean after use
  // if we not clean that will make the new event and the previouus events work in evrey click
  // wich mean the last updated title will updated in all updated tasks before
  editBtn.onclick = function () {
    todos[index].title = popuptodoInputValue.value;
    closeUpdatePopup();
    showTodos();
    animationStatus("updated", index);
    popupMsg(`Todo (${index + 1}) update succesfulley`);
    localStorage.setItem("todos", JSON.stringify(todos));
  };
}
function closeUpdatePopup() {
  const popUp = document.querySelector(".popup");
  popUp.style.display = "none";
}

function deleteTodo(index) {
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  // Delay update Container to inject the animtion
  setTimeout(() => {
    showTodos();
  }, 1500);

  // index + 1 ===  TODO PLACE >>  we addedit to enhance user exprince
  popupMsg(`Todo (${index + 1}) deleted succesfulley`);
  animationStatus("deleted", index);
}
