document.addEventListener("DOMContentLoaded", function () {
  const changeColorButton = document.getElementById("changeColorButton");

  changeColorButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (chrome.runtime.lastError) {
        // Handle the error, e.g., display an error message.
        console.error(chrome.runtime.lastError);
        return;
      }
      if (!tabs || tabs.length === 0) {
        // Handle the case where no active tabs are found.
        return;
      }

      const tab = tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeH1Color,
      });
    });
  });
});

// redirect user by image src link 
function redirectImageLink(){
  let RedirectLink  = event.target.src;
  window.open(RedirectLink, '_blank');
}

function changeH1Color() {
  var LinkImages = document.querySelectorAll("a");
var images = document.querySelectorAll("img");
document.body.innerHTML = `<body><style> *{margin: 0;padding: 0;box-sizing: border-box} #image-container { display: flex; flex-wrap: wrap; } .image { height: 250px; border: 1px solid #ddd; } </style> <div id="image-container"></div> </body>`;
var ex = (url) => url.match(/\.([^/?#]+)(?:[?#]|$)/i)?.[1] || '';
var imageContainer = [];

function setUrls(linksData){
	linksData.forEach((e)=>{
	let tagName = e.tagName.toLowerCase();
	let url;
	if(tagName == "img" && e.src.length >5){
		url =  new URL(e.src).href;
	}
	else if (tagName == "a" && e.href.length >5){
		url =   new URL(e.href).href;
	}
	else{
		return 0;
	}
    let extension = ex(url).toLowerCase();
    if (extension === 'jpg' ||extension === 'jpeg' ||extension === 'png' ||extension === 'gif' ||extension === 'bmp' ||extension === 'svg' ||extension === 'webp' || extension === 'tiff' || tagName == "img") {
       imageContainer.push(url);
    }
})
}
setUrls(LinkImages);
setUrls(images);


let imagesPerLoad = 10;
let startIndex = 0;
let endIndex = imagesPerLoad;
function loadImages(start, end) {
	for (let i = start; i < end; i++) {
		if (i >= imageContainer.length) {
			break;
		}
		document.getElementById('image-container').innerHTML += `<img src='${imageContainer[i]}' class="image" onclick="redirectImageLink()">`;
	}
}

loadImages(startIndex, endIndex);

window.addEventListener('scroll', () => {
	if (window.innerHeight + window.scrollY >= document.body.offsetHeight-200) {
		startIndex = endIndex;
		endIndex += imagesPerLoad;
		loadImages(startIndex, endIndex);
	}
});
}
