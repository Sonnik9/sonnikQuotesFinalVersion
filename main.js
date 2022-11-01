
let bodyContainer = document.querySelector('.bodyClass');
let headerItem = document.getElementById('header-item');
let containerPageHome = document.getElementById('containerPageHome');
let containerPageMyCase = document.getElementById('containerPageMyCase');
let successSavedId = document.getElementById('successSavedId');
let arrDirectRow = [];
let arrDirectRowForImg = [];
let homeTemplate = ` <div class="titule-block">                        
                        <p id="searchBtn" class="SearchText">
                           Search
                              <i class="fa-solid fa-magnifying-glass btn">
                              </i>
                          </p>                         
                      </div>

                    <div class="container-img">                     
                      <img id="altImg" class="altImg" Alt="Image Of Nature">  
                    </div>        
                    
                    <div class="border-frame">
                      <div class="bufer-for-lock">
                      <div class="language" id="language">             
                         </div>
                      <div class="saveBox" id="saveBox">
                          <i class="fa-solid fa-lock-open saveInCase" id="lockId"></i>                        
                      </div> 
                      </div>
                      
                      <div id="textQuotes" class="border-textQuotes">
                                     
                      </div>
                          <div id="author" class="author">                  
                      </div>       
                    </div>           
                    
                    `;
                    
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
let saveQuote = document.querySelector('.fa-lock-open');

let curentId = '';
let indList = 0;
let indList2 = 0;


let langSelect = document.getElementById('language');
let isResizeble = false;
setTimeout(loadQuote, 1000);
searchQuote.addEventListener('click', loadQuote, {once:true});
searchQuote.removeEventListener('click', loadQuote); 



function randomChoise() {  
  indList++; 
  textContainer.textContent = '';
  authorContainer.textContent = '';
  typewriterForText(); 
  curentId = dataQuotes[arrDirectRow[indList]].id;
    if(indList==867)
       indList=0;  
}

function randomChoiseForImg() {  
  indList2++
  imgAlt.src = '';
  imgAlt.src = dataImgForBtn[arrDirectRowForImg[indList2]].newSrc;
  imgAlt.classList.add('altImgAnimation');
  setTimeout(function() {imgAlt.classList.remove('altImgAnimation')}, 1100);  
  // imgAlt.style.animationPlayState = 'running'; 
    if(indList2==99)
       indList2=0;  
}

function loadQuote() {
  saveQuote.classList.remove('fa-lock');
  saveQuote.classList.add('fa-lock-open');
  setTimeout(function() {saveQuote.addEventListener('click', saveCurentQuote)}, 1000);
  randomChoiseForImg()  
  randomChoise(); 
  langSelect.innerHTML = `<select name="language" id="oLanguage" class="select"
                           onchange="readyText(dataQuotes)">
                            <option class= "option" value="en">EN</option>                
                                
                           </select>  `;                  
}

/* <option value="ru">RU</option>      */

///////////////////////////////////////////////////////////////////////////////

function pasterText(a, b) {
  textContainer.textContent = '';   
  textContainer.textContent = a; 
  authorContainer.textContent = '';
  authorContainer.textContent = b;   
}

function readyText(data) {
  let targetLanguage = document.getElementById('oLanguage').value;
  if(targetLanguage == 'en') {
      pasterText(data[arrDirectRow[indList]].text, data[arrDirectRow[indList]].author)
  }
  else {        
      pasterText(data[arrDirectRow[indList]].textRu, data[arrDirectRow[indList]].authorRu)
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
    containerPageMyCase.addEventListener('click', removeItemCase, {once: true});   
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
  saveQuote.classList.remove('fa-lock-open');
  saveQuote.removeEventListener('click', saveCurentQuote);
  saveQuote.classList.add('fa-lock');
  successSavedId.style.display = 'block';
  successSavedId.classList.add('successAnime');
  setTimeout(function() { successSavedId.classList.remove('successAnime'); successSavedId.style.display = 'none'}, 4700)

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
            en: `${dataQuotes[arrDirectRow[indList]].text} <br> <p class="spanAuthor">${dataQuotes[arrDirectRow[indList]].author}</p>`,
            ru: `${dataQuotes[arrDirectRow[indList]].textRu} <br> <p class="spanAuthor">${dataQuotes[arrDirectRow[indList]].authorRu}</p>`,
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
    
    if(e.target.className == 'hide') { 
      let imgId = document.querySelectorAll('.hide');
      imgId.forEach((el, ind) => {
        el.dataset.order = ind;
      });     
     
      let arrCase = getCase();
      smoke.confirm(('Are you realy want to remove this quote?'), function (result) {
        if (result === false || (result === false && result === true)) {
          setTimeout(function(){containerPageMyCase.addEventListener('click', removeItemCase, {once: true})}, 300);
          return;
        }    
        arrCase.splice(e.target.dataset.order, 1);
         
        let postBlock = e.target.parentElement.parentElement.parentElement; 
        ////////////////////////////////////////////////////////////////
        let currentHeight = Math.floor(JSON.parse(getComputedStyle(postBlock).height.slice(0, -2)));    
        postBlock.style.animationPlayState = 'running';          
        movessAnime(); 
        
        function movessAnime() {  
          if(currentHeight != 0) {
            currentHeight = currentHeight - 1;  
            postBlock.style.height = currentHeight + 'px';   
            setTimeout(movessAnime, 0.1);
          }
          else { 
                
            return  
          }        
        }
        setTimeout(function (){postBlock.remove()}, 700);    
        /////////////////////////////////////////////////////////////////    
        localStorage.setItem('case',  JSON.stringify(arrCase));
      
      }); 
     
    } 
    setTimeout(function(){containerPageMyCase.addEventListener('click', removeItemCase, {once: true})}, 900); 
}

// localStorage.removeItem('case')






