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
const manImage = document.getElementById('man-image');
let manImageIndex = 0;
let answerArr = [];

function setWord() {
    answerArr = [];
    manImage.src = `images/man0.png`;
    manImageIndex = 0;
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
        answerBlock.appendChild(letterBox);
    }
    entryArray = document.getElementsByClassName('letter-box')
    entryArray = Array.from(entryArray);
    //console.log(entryArray);
    populateKeyboard();

    let wordArrCopy = wordArr.slice();
    wordArrCopy = wordArrCopy.filter(value => value !== ' ');
    wordArrCopy = wordArrCopy.filter((value, index) => {
        return wordArrCopy.indexOf(value) === index;
    });
    console.log("copy: " + wordArrCopy)
    newCopyArray = wordArrCopy;
}

alphabet = Array.from("qwertyuiopasdfghjklzxcvbnm");
function populateKeyboard() {
  const keyboardArea = document.querySelector('.input');
  while (keyboardArea.lastElementChild) {
    keyboardArea.removeChild(keyboardArea.lastElementChild);
  }
  for (i=0;i<26;i++){
    const key = document.createElement('div');
    key.className = 'key';
    key.textContent = alphabet[i].toUpperCase();
    key.addEventListener('click', function(){
      letter = key.textContent;
      if (wordArr.includes(letter)){
        console.log("This letter is in the answer: " + key.textContent);
        answerArr.push(letter);
        console.log("answerArr: " + answerArr);
        console.log("copyArr: " + newCopyArray);
        console.log("wordArr: " + wordArr);
        for (i=0;i<wordArr.length;i++){
          if (wordArr[i] == letter){
            entryArray[i].textContent = letter;
            key.textContent = '';
            if (answerArr.every(letter => newCopyArray.includes(letter)) && newCopyArray.every(letter => answerArr.includes(letter))) {
              console.log("All Letters Match!");
            }
          }
        }
      } else if (key.textContent !== ''){
        key.textContent = '';
        console.log("Letter not in word");
        manImageIndex += 1;
        manImage.src = `images/man${manImageIndex}.png`;
        if (manImageIndex === 6){
          console.log("Game Over");
          let keys = Array.from(document.getElementsByClassName('key'));
          for (j=0;j<keys.length;j++) {
            keyboardArea.removeChild(keyboardArea.lastElementChild);
          }
          const gameOverScreen = document.createElement('div');
          const playAgain = document.createElement('div');
          gameOverScreen.className = 'key-off';
          gameOverScreen.textContent = `Game over! Answer: ${word}`;
          playAgain.className = 'key-off';
          playAgain.textContent = 'Select a category to play again.';
          keyboardArea.appendChild(gameOverScreen);
          keyboardArea.appendChild(playAgain);

        }
      }
    });
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


