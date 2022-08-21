const hambug = document.querySelector(".hambug");
const navUl = document.querySelector("nav > ul");
const submitItem = document.getElementById("submitItem");
const itemTitle = document.getElementById("title");
const itemDescription = document.getElementById("description");
const ToDoList = document.getElementById("ToDoList");
const dialogBox = document.getElementById("dialogBox");
const searchToDo = document.getElementById("searchToDo");
const searchToDoBtn = document.getElementById("searchToDoBtn");

const items = localStorage.getItem("ToDos")
  ? JSON.parse(localStorage.getItem("ToDos"))
  : [];

submitItem.addEventListener("click", () => {
  const temp = {};
  temp.title = itemTitle.value;
  temp.description = itemDescription.value;
  items.push(temp);
  updateStorage();
});

searchToDoBtn.addEventListener("click", () => {
  const searchQuery = searchToDo.value;
  const arr = items.filter((element) => {
    if (
      element.title.includes(searchQuery) ||
      element.description.includes(searchQuery)
    ) {
      return true;
    }
    return false;
  });
  console.log(arr);
  updateToDoList(arr);
});

function updateStorage() {
  localStorage.setItem("ToDos", JSON.stringify(items));
  updateToDoList();
}

function updateToDoList(arr = items) {
  let html = null;
  if (localStorage.getItem("ToDos")) {
    arr.forEach((element, index) => {
      html += `
        <div class="card" index="${index}" id="ToDo${index + 1}">
          <h3 index="${index}" onclick="showToDo(event);">
            ${index + 1}) ${
        element.title.length > 5
          ? element.title.slice(0, 5) + "..."
          : element.title
      }
          </h3>
          <button 
          index="${index}"
          class="editBtn" onclick='editToDo(event)'>Edit</button>
          <button class="deleteBtn" onclick='deleteToDo(event)'>Delete</button>
          <div index="${index}" onclick="showToDo(event);">
            ${
              element.description.length > 45
                ? element.description.slice(0, 45) + "..."
                : element.description
            }
          </div>
        </div>
        `;
    });
  }
  // console.log(html);
  ToDoList.innerHTML = html ? html.slice(4) : "No items found.";
}

function showToDo(event) {
  const temp = items[Number.parseInt(event.target.getAttribute("index"))];
  // console.log(temp);
  dialogBox.innerHTML = `
  <h3>${temp.title}</h3><button onclick="dialogBox.style.display = 'none'">X</button>
  <span>${temp.description}</span>
  `;
  dialogBox.style.display = "grid";
}

function editToDo(event) {
  const index = event.target.parentElement.getAttribute("index");
  dialogBox.innerHTML = `
  <form name="addItem" onsubmit="event.preventDefault();">
          <label for="dialogTitle">Title</label>
          <input type="text" name="dialogTitle" placeholder="Title"
          value="${items[index].title}"
          index="${index}"/>
          <label for="dialogDescription">Description</label>
          <textarea
            name="dialogDescription"
            placeholder="Description"
          >${items[index].description}</textarea>
          <button onclick="updateItem()">Update Item</button>
        </form>
        <button onclick="dialogBox.style.display = 'none'">X</button>
  `;
  dialogBox.style.display = "grid";
}

function updateItem() {
  const title = document.querySelector("input[name='dialogTitle']");
  const description = document.querySelector("textarea[name='dialogDescription']");
  const index = title.getAttribute("index");
  // console.log(title, description, index);
  items[index].title = title.value;
  items[index].description = description.value;
  updateStorage();
  dialogBox.style.display = "none";
}

function deleteToDo(event) {
  const index = event.target.parentElement.getAttribute("index");
  items.splice(index, 1);
  updateStorage();
}

updateToDoList();
