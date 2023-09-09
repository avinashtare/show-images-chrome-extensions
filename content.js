// content.js
let data = "ok";
function changeH1Color() {
    const h1Elements = document.querySelectorAll('h1');
    h1Elements.forEach(function(h1) {
      h1.style.color = 'red'; // Change the color to your desired color
    });
  }
  
//   changeH1Color();  