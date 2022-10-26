 
//////////////////////////////////////////////////////////////////////////////////
let bodyContainer = document.querySelector('.bodyClass');
let headerItem = document.getElementById('header-item');
let containerPageHome = document.getElementById('containerPageHome');
let containerPageMyCase = document.getElementById('containerPageMyCase');
let arrDirectRow = [];
let arrDirectRowForImg = [];
let homeTemplate = `<h1>Daily Quotes</h1>

                    <div class="container-img">                     
                      <img id="altImg" class="altImg" Alt="Image Of Nature">  
                    </div>        
                    
                    <div class="border-frame">
                      <div id="textQuotes" class="border-textQuotes">                
                      </div>
                      <div id="author" class="author">                  
                      </div>       
                    </div>           
                    
                    <div class="control">
                      <button id="searchBtn" class="btn">
                        Search
                      </button>
                      <div class="saveBox" id="saveBox" data-title="Save">
                        <img class="saveInCase" src="./img/save--v1.png" alt="">
                      </div>
                      <div class="language" id="language">             
                      </div>
                    </div>`;
                    
location.hash = 'home';

function genericPageHome() {  
  containerPageHome.innerHTML = homeTemplate;
  headerItem.textContent = 'My Case';  
}
genericPageHome();

function randomUnorderRow() {  
  for(i = 0; i < 868; i++) {
    arrDirectRow.push(i)
  }
  arrDirectRow.sort(()=>Math.random()-0.5); 
  return arrDirectRow
}
randomUnorderRow();

function randomUnOrderRowForImg() {  
  for(i = 0; i < 100; i++) {
    arrDirectRowForImg.push(i)
  }
  arrDirectRowForImg.sort(()=>Math.random()-0.5); 
  return arrDirectRowForImg
}
randomUnOrderRowForImg();

/////////////////////////////////////////////////////////////////////////////
  
let container = document.getElementById('container')
let textContainer = document.getElementById('textQuotes');
let authorContainer = document.getElementById('author');
let searchQuote = document.getElementById('searchBtn');
let imgAlt = document.getElementById('altImg');
let webImg = document.getElementById('webImgId');
let myCase = document.getElementById('header-item');
let saveQuote = document.getElementById('saveBox');
let globalChange = '';
let curentId = '';
let obgRu = {
    text: "",
    avtor: ""
};
let obgEn = {
    text: "",
    avtor: ""

};
let indList = 0;
let indList2 = 0;

setTimeout(loadQuote, 1000);
let langSelect = document.getElementById('language');
searchQuote.addEventListener('click', loadQuote);

function randomChoise() {  
  indList++
  textContainer.textContent = dataQuotes[arrDirectRow[indList]].text; 
  authorContainer.textContent =  dataQuotes[arrDirectRow[indList]].author;
  curentId = dataQuotes[arrDirectRow[indList]].id;
    if(indList==867)
       indList=0;  
}

function randomChoiseForImg() {  
  indList2++
  imgAlt.src = dataImgForBtn[arrDirectRowForImg[indList2]].download_url; 
    if(indList2==99)
       indList2=0;  
}

function loadQuote() {
  setTimeout(function() {saveQuote.addEventListener('click', saveCurentQuote)}, 1000);
  randomChoiseForImg()  
  randomChoise(); 
  langSelect.innerHTML = `<select name="language" id="oLanguage" class="select"
                           onchange="readyText()">
                            <option value="en">EN</option>                
                            <option value="ru">RU</option>         
                           </select>  `; 
                           
  convert('en', 'ru');                 
}

///////////////////////////////////////////////////////////////////////////////

async function convert(source, target){   
  obgEn.text = textContainer.textContent;
  obgEn.avtor = authorContainer.textContent;
  obgRu.text = '';
  obgRu.avtor = '';  
  let q = obgEn.text + " " + "&&" + " " +  obgEn.avtor; 

  data ={
      q,
      source,
      target
  }
  data = JSON.stringify(data);  
  
  let res = await fetch("https://libretranslate.de/translate", {
    method: "POST",
    body: data,
    headers: { "Content-Type": "application/json" }
  });

  let targetTranslation =  await res.json();
  globalChange = targetTranslation.translatedText;
      if(globalChange != '') {       
        resultTransleting();
      }     
}

function resultTransleting() {           
    for (let i = 0; i < globalChange.length; i++) {    
      if(globalChange[i] == '&') {     
          obgRu.text += globalChange.slice(0, i-1);    
          obgRu.avtor += globalChange.slice(i+2, globalChange.length);     
      }       
    }     
}

function pasterText(a, b) {
  textContainer.textContent = '';   
  textContainer.textContent = a; 
  authorContainer.textContent = '';
  authorContainer.textContent = b;   
}

function readyText() {
  let targetLanguage = document.getElementById('oLanguage').value;
  if(targetLanguage == 'ru') {
      pasterText(obgRu.text, obgRu.avtor)
  }
  else {        
      pasterText(obgEn.text, obgEn.avtor)
  }   
}

///////////////////////////////////////////////////////////////////////////////

window.addEventListener('hashchange', renderinG);

function renderinG() { 
  if(location.hash == '#home') {
    headerItem.textContent = 'My Case';
    containerPageMyCase.innerHTML = '';     
    containerPageHome.style.display = 'block';
  }    
    
  else {
    headerItem.textContent = 'Home';
    containerPageHome.style.display = 'none';
    let arrCase = getCase();
    genericPageMyCase(arrCase)   
  } 
}

headerItem.onclick = function ruleForRenderinG(e) {
  if(e.target.innerText == 'My Case')
  location.hash = '#mycase'
  else
  location.hash = '#home'
}

function genericPageMyCase(content) {
  content.forEach((el, inddd) => {
    let element = `<div class="post">    
                      <div class="border-textQuotes">
                         <div class="flexForHide">
                            <img src="./img/hide.jpg" data-order = "${inddd}" id="hide" class="hide">                                            
                          </div>  
                      <div class="enSavedQuote">
                         ${el.en}
                      </div>
                      <hr>                           
                      <div class="ruSavedQuote">
                         ${el.ru}
                      </div>                      
                   </div>`;
    containerPageMyCase.innerHTML += element;   
    containerPageMyCase.addEventListener('click', removeItemCase);   
  });
}

////////////////////////////////////////////////////////////////////////////////////

let flagRepetitions = true;
  
function getCase() {
  let resultForCaseItem = localStorage.getItem('case');
     if(resultForCaseItem != null) {
        return JSON.parse(resultForCaseItem)
     }
     else 
     return [];
}

function saveCurentQuote() {
  let casse = getCase();
  casse.forEach(el =>  {
        if(curentId == el.id)
        flagRepetitions = false;
      });
  setTimeout(saveCurentQuote2, 700);

  function saveCurentQuote2() {  
      if(flagRepetitions == true) {
        casse
          .push({
            en: `${obgEn.text} <br> <p class="spanAuthor">${obgEn.avtor}</p>`,
            ru: `${obgRu.text} <br> <p class="spanAuthor">${obgRu.avtor}</p>`,
            id: `${curentId}`
          });
      }    
      else {
        smoke.alert ('This elemen already exist in My Case');
        flagRepetitions = true;
      }
      localStorage.setItem('case', JSON.stringify(casse));
  }
}
 
function removeItemCase(e) { 
  let imgId = document.querySelectorAll('.hide');
      imgId.forEach((el, ind) => {
        el.dataset.order = ind;
      });
  let arrCase = getCase();
  if(e.target.className == 'hide') {     
    arrCase.splice(e.target.dataset.order, 1);
    let postBlock = e.target.parentElement.parentElement.parentElement; 
    let currentHeight = Math.floor(JSON.parse(getComputedStyle(postBlock).height.slice(0, -2)));    
    postBlock.style.animationPlayState = 'running';   
    setTimeout(movessAnime, 600); 
    
    function movessAnime() {  
      if(currentHeight != 0) {
        currentHeight = currentHeight - 10;  
        postBlock.style.height = currentHeight + 'px';   
        setTimeout(movessAnime, 10);
      }
      else {       
        return  
      }        
    }
    setTimeout(function (){postBlock.remove()}, 950);    
    /////////////////////////////////////////////////////////////////    
    localStorage.setItem('case',  JSON.stringify(arrCase));        
  }   
}

// localStorage.removeItem('case')






