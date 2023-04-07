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
    console.log("length of arr: " + jsonWords[cat].length);
    console.log("word: " + jsonWords[cat][ind]);
    getWord(cat, ind);
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
            getWord(cat, ind);
        });
        a.innerHTML = wordCategories[i];
        list.appendChild(a);
    }
}

document.getElementById('title').addEventListener('click', setWord)
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