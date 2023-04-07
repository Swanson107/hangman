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
    //console.log(jsonWords); // you can access the JSON data here
    getWord("desserts", 12); // call getWord() here
  })
  .catch(error => {
    console.log(error);
  });

function getWord(category, wordIndex) {
  //console.log(jsonWords[category][wordIndex]);
}

function setWord() {
    let cat = prompt("Enter cat");
    let ind = Math.floor(Math.random() * jsonWords[cat].length);
    console.log(jsonWords[cat].length)
    getWord(cat, ind);
}

function showCategories() {
    let list = document.getElementById('myDropdown');
    for (i = 0;i < wordCategories.length; i++){
        let a = document.createElement("a");
        a.href = "#";
        a.innerHTML = wordCategories[i];
        list.appendChild(a);
    }
}

document.getElementById('title').addEventListener('click', setWord)
document.getElementById('dropbtn').addEventListener('click', showCategories);


window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
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