function showDropdown() {
    document.getElementById('myDropdown').classList.toggle("show");
}

let wordCategories = [];
let jsonWords;

fetch('words.json')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch words');
    }
  })
  .then(data => {
    jsonWords = data;
    for(let cat of Object.keys(jsonWords)) {
        wordCategories.push(cat);
    }
  })
  .catch(error => {
    console.log(error);
  });

let word = "";
let answerBlock = document.querySelector('#answer-block');

function setWord() {
    while (answerBlock.lastElementChild) {
        answerBlock.removeChild(answerBlock.lastElementChild);
    }
    console.log(word);
    word = word.toUpperCase()
    wordArr = Array.from(word);
    console.log(wordArr);
    for (i=0;i<word.length;i++){
        const letterBox = document.createElement('div');
        letterBox.className = 'letter-box';
        letterBox.textContent = wordArr[i];
        answerBlock.appendChild(letterBox);

    }
}

alphabet = Array.from("qwertyuiopasdfghjklzxcvbnm");
console.log(alphabet);

function populateKeyboard() {
  const keyboardArea = document.querySelector('.input');
  for (i=0;i<26;i++){
    const key = document.createElement('div');
    key.className = 'key';
    key.textContent = alphabet[i];
    keyboardArea.appendChild(key);
  }
}


let cat, ind;

function showCategories() {
    const drop = document.getElementById('myDropdown');
    while (drop.lastElementChild) {
        drop.removeChild(drop.lastElementChild);
    }
    let list = document.getElementById('myDropdown');
    for (i = 0;i < wordCategories.length; i++){
        let a = document.createElement("a");
        a.href = "#";
        let cat = wordCategories[i];
        a.addEventListener('click', function() {
            let ind = Math.floor(Math.random() * jsonWords[cat].length);
            console.log("Length: " + jsonWords[cat].length);
            console.log("Word: " + jsonWords[cat][ind]);
            word = jsonWords[cat][ind];
            setWord();
        });
        a.innerHTML = wordCategories[i];
        list.appendChild(a);
    }
}

document.getElementById('title').addEventListener('click', populateKeyboard);
document.getElementById('dropbtn').addEventListener('click', showCategories);


window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const drop = document.getElementById('myDropdown');
        while (drop.lastElementChild) {
            drop.removeChild(drop.lastElementChild);
        }
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
}


