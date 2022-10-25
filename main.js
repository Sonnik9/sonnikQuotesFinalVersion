let container = document.getElementById('container')
let textContainer = document.getElementById('textQuotes');
let authorContainer = document.getElementById('author');
let searchQuote = document.getElementById('searchBtn');
let imgAlt = document.getElementById('altImg');
let webImg = document.getElementById('webImgId');
let myCase = document.getElementById('header-item');
let saveQuote = document.getElementById('saveBox');
let globalChange = '';
let resultForCaseItem = [];
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
let resultTransletingFlag = false;

setTimeout(loadQuote, 1000);
let langSelect = document.getElementById('language');
searchQuote.addEventListener('click', loadQuote);

function randomChoise() {  
  indList++
  textContainer.textContent = dataQuotes[arrDirectRow[indList]].text; 
  authorContainer.textContent =  dataQuotes[arrDirectRow[indList]].author;
  curentId = dataQuotes[arrDirectRow[indList]].id;
    if(indList==6)
       indList=0;  
}

function randomChoiseForImg() {  
  indList2++
  imgAlt.src = dataImgForBtn[arrDirectRowForImg[indList2]].download_url; 
    if(indList2==99)
       indList2=0;  
}

function loadQuote() {
  setTimeout(function() {saveQuote.addEventListener('click', saveCurentQuote)}, 2000);
  randomChoiseForImg()  
  randomChoise(); 
  langSelect.innerHTML = `<select name="language" id="oLanguage" class="select"
                           onchange="readyText()">
                            <option value="en">EN</option>                
                            <option value="ru">RU</option>         
                           </select>  `; 
                           
  convert('en', 'ru');                       
  flagAlt = true;  
}
