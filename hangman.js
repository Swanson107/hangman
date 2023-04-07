function showDropdown() {
    document.getElementById('myDropdown').classList.toggle("show");
}

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
    //console.log(jsonWords); // you can access the JSON data here
    getWord("desserts", 12); // call getWord() here
  })
  .catch(error => {
    console.log(error);
  });

function getWord(category, wordIndex) {
  console.log(jsonWords[category][wordIndex]);
}

function setWord() {
    let cat = prompt("Enter cat");
    let ind = Math.floor(Math.random() * jsonWords[cat].length + 1);
    console.log(jsonWords[cat].length)
    getWord(cat, ind);
}

document.getElementById('title').addEventListener('click', setWord)



function log(str){
    console.log(str);
}


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