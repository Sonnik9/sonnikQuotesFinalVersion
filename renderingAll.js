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
    genericPageMyCase(JSON.parse(localStorage.getItem('case')))   
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
    let post = document.createElement('div');
    post.className = 'post';
    let element = `<div class="border-frame">    
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
    post.innerHTML += element;
    containerPageMyCase.append(post);
    containerPageMyCase.addEventListener('click', removeItemCase);   
  });
}
