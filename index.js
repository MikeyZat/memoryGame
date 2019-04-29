import {data_list} from './data.js';

const showModal = () => {
  let body = document.getElementsByTagName("body")[0];
  body.classList.add("freeze");
  window.scrollTo(0,0);
  let modal = document.createElement("div");
  modal.className = "modal";
  let modal_content = document.createElement("div");
  modal_content.classList = "modal-content";
  let text = document.createElement("span");
  text.className = "modal-text";
  text.innerText = "MATCH!";
  modal_content.appendChild(text);
  let success = document.createElement("div");
  success.className = "check-icon";
  success.innerHTML = "<span class=\"icon-line line-tip\"></span>\n" +
      "    <span class=\"icon-line line-long\"></span>\n" +
      "    <div class=\"icon-circle\"></div>\n" +
      "    <div class=\"icon-fix\"></div>";
  modal_content.appendChild(success);
  modal.appendChild(modal_content);
  body.appendChild(modal);
  setTimeout(() => {
      body.removeChild(modal);
      body.classList.remove("freeze");
  },2000);
};

function handleClick() {
    this.classList.add("show");
    handleClicks(this);
}

const insertDivToMap = (text, map, id, description = false) => {
    let randomRow = Math.floor((Math.random() * map.length));
    let div = document.createElement("div");
    div.innerText = text;
    div.my_id = id;
    div.className = "card";
    if(description) div.classList.add("description")
    div.addEventListener("click", handleClick);
    while (map[randomRow].length > 7)
        randomRow = Math.floor((Math.random() * map.length));

    map[randomRow].push(div);

};

const mapToHtml = (map, rows) => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            rows[i].appendChild(map[i][j]);
        }
    }
};

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


const container = document.getElementById("game");
const rows = document.getElementsByClassName("row");
let myData = [...data_list];
let map = [[], [], [], []];


while (myData.length > 0) {
    let randomIndex = Math.floor((Math.random() * myData.length));
    let data = myData.splice(randomIndex, 1)[0];
    insertDivToMap(data.name, map, myData.length);
    insertDivToMap(data.description, map, myData.length, true);
}
for (let i = 0; i < map.length; i++) {
    map[i] = shuffle(map[i]);
}

mapToHtml(map, rows);

const stack = [];
const handleClicks = (div) => {
    if(!stack.includes(div))stack.push(div);
    if (stack.length === 2) {
        let div1 = stack.splice(1, 1)[0];
        let div2 = stack.splice(0, 1)[0];
        if (div1.my_id === div2.my_id) {
            showModal();
            div1.removeEventListener("click", handleClick);
            div2.removeEventListener("click", handleClick);
            div1.classList.add("matched");
            div2.classList.add("matched");
        } else {
            setTimeout(() => {
                div1.classList.remove("show");
                div2.classList.remove("show");
            },2000);
        }
    }
};