function showDropdown() {
    document.getElementById('myDropdown').classList.toggle("show");
}

let jsonWords;

function getWord(category, wordIndex) {

jsonWords = fetch('words.json')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch words');
    }
  })
  .then(data => {
    console.log(data[category][wordIndex]);
    // You can access individual categories like data.categoryName
  })
  .catch(error => {
    console.log(error);
  });
}

getWord('desserts', 12);


function jsonTest() {
    for (i=0;i<words.length;i++){
        console.log("Hello");
    }
}

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