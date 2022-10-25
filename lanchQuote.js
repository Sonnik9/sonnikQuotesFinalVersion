let bodyContainer = document.querySelector('.bodyClass');
console.log(window.innerHeight)
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
  for(i = 0; i < 7; i++) {
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












// <img  id="webImgId" class="webImg" style="display: block"
// src="http://placeimg.com/270/170/nature">

                            

