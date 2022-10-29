
let textPosition1 = 0; 
let textPosition2 = 0; 
typewriterForText = () => {
    textContainer.textContent = dataQuotes[arrDirectRow[indList]].text.substring(0, textPosition1);
    if(textPosition1++ != dataQuotes[arrDirectRow[indList]].text.length) {
       setTimeout("typewriterForText()", 40);
    } 
    else {
        textPosition1 = 0; 
        typewriterAuthor();   
        return 
    }    
}

typewriterAuthor = () => {
    authorContainer.textContent =  dataQuotes[arrDirectRow[indList]].author.substring(0, textPosition2);
    if(textPosition2++ != dataQuotes[arrDirectRow[indList]].author.length) {
       setTimeout("typewriterAuthor()", 150);
    } 
    else {
        textPosition2 = 0;
        isResizeble = false;
        searchQuote.addEventListener('click', loadQuote, {once: true});
        return 
    }  
}