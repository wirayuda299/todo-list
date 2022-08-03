setInterval(() => {
  const today = new Date();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = time;
  const d = document.getElementById("time");
  d.innerText = dateTime;
}, 1000);

const ul = document.getElementById("list");
const warnTxt = document.getElementById("warn");

const btn = document
  .getElementById("btn")
  .addEventListener("click", validation);
const data = [];
const input = document.getElementById("input");

//basic validation user input
function validation() {
  if (input.value === "") {
    warnTxt.innerText = "Empty, please add something!";
    setTimeout(() => (warnTxt.innerText = ""), 1000);
  } else if (input.value.length <= 4) {
    warnTxt.innerText =
      "Text can't be shorten then 4 charcaters. Add longer text please";
    setTimeout(() => (warnTxt.innerText = ""), 1000);
  } else if (data.includes(input.value)) {
    warnTxt.innerText = "Given task is exist";
    input.value = "";
    setTimeout(() => (warnTxt.innerText = ""), 1500);
  } else {
    createEl(); //if validation is valid run function
    input.value = "";
    return;
  }
}

function createEl() {
  const small = document.createElement("small");
  const listItem = document.createElement("li");
  listItem.classList.add(
    "list-group-item",
    "bg-primary",
    "ps-3",
    "fs-5",
    "text-white"
  );
  listItem.innerText = input.value;
  ul.appendChild(small);
  ul.appendChild(listItem);

  data.push("todo", String(input.value));
  return container();

  function container() {
    const div = document.createElement("div");
    div.classList.add(
      "container-fluid",
      "d-flex",
      "justify-content-end",
      "text-white"
    );
    listItem.appendChild(div);

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash", "float-end", "text-danger");
    div.appendChild(trashIcon);

    const checkIcon = document.createElement("i");
    checkIcon.classList.add(
      "fa-solid",
      "fa-square-check",
      "float-end",
      "text-success"
    );
    div.appendChild(checkIcon);

    trashIcon.addEventListener("click", deleteList);
    checkIcon.addEventListener("click", done);

    function done() {
      trashIcon.remove();
      const dates = new Date();
      const tanggal = dates.toLocaleDateString();
      const time = dates.toLocaleTimeString();
      listItem.classList.add("text-decoration-line-through", "disabled");
      small.classList.add("text-success");
      small.innerText = `mark as done on ${tanggal} at ${time}`;
      setTimeout(() => {
        // listItem.remove();
        checkIcon.remove();
        listItem.style.opacity = "0.4";
        listItem.classList.add("pe-none");
        small.innerText = "";
      }, 2000);
    }

    function deleteList() {
      small.classList.add("text-danger");
      small.innerText = "permanently delete";
      listItem.remove();
      setTimeout(() => (small.innerText = ""), 1200);
    }
  }
}
