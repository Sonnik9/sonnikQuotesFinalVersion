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
    resultTransletingFlag = true;               
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







