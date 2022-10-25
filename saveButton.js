let flagRepetitions = true;

function saveCurentQuote() { 
  resultForCaseItem = JSON.parse(localStorage.getItem('case'));
  resultForCaseItem.forEach(el =>  {
    if(curentId == el.id)
    flagRepetitions = false;
  });
  setTimeout(saveCurentQuote2, 1000);       
}

function saveCurentQuote2() {
  if(flagRepetitions == true){
    if(resultForCaseItem == [])
    localStorage.setItem('case', JSON.stringify(resultForCaseItem));
    ////////////////////////////////////////////////////////////////
    resultForCaseItem = JSON.parse(localStorage.getItem('case'));
    resultForCaseItem.push({en: `${obgEn.text} <br> <p class="spanAuthor">${obgEn.avtor}</p>`,
    ru: `${obgRu.text} <br> <p class="spanAuthor">${obgRu.avtor}</p>`, id: `${curentId}`});
    localStorage.setItem('case', JSON.stringify(resultForCaseItem));     
  }
  else {   
      smoke.alert ('This elemen already exist in My Case');
      flagRepetitions = true;
    }  
}

function removeItemCase(e) { 
  let imgId = document.querySelectorAll('.hide');
      imgId.forEach((el, ind) => {
        el.dataset.order = ind;
      });
  if(e.target.className == 'hide') {     
    resultForCaseItem = JSON.parse(localStorage.getItem('case'));     
    resultForCaseItem.splice(e.target.dataset.order, 1);     
    e.target.parentElement.parentElement.parentElement.remove();      
    localStorage.setItem('case', JSON.stringify(resultForCaseItem));        
  }   
} 






