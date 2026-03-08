let searchInputEl= document.getElementById("searchInput");
let searchresultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
function createAndAppend(result){
    let {title, link, description}= result ;
    //1.div container 
    let resultsItem = document.createElement('div');
    resultsItem.classList.add('result-item');
    searchresultsEl.appendChild(resultsItem);
    //2.Anchor title -- result-title
    
    let resultTitleEl = document.createElement('a');
    resultTitleEl.classList.add('result-title');
    resultTitleEl.textContent= title ;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultsItem.appendChild(resultTitleEl);
    
    //3.title break
    let titleBreakEl = document.createElement('br');
    resultsItem.appendChild(titleBreakEl);
    
    //4.Anchor url result-url
    let urlEl = document.createElement('a');
    urlEl.classList.add('result-url');
    urlEl.textContent=link;
    urlEl.href=link;
    resultsItem.appendChild(urlEl);
    
    //5.line-break
    let lineBreakEl = document.createElement('br');
    resultsItem.appendChild(lineBreakEl);
    
    //6.paragraph description line-description
    let descriptionEl = document.createElement('p');
    descriptionEl.classList.add('line-description');
    descriptionEl.textContent=description;
    resultsItem.appendChild(descriptionEl);
}
function displayResults(searchResults){
    spinnerEl.classList.toggle('d-none');
    for (let result of searchResults){
    createAndAppend(result);}
}
function searchWikepedia(event){
    if(event.key === "Enter"){
        searchresultsEl.textContent="";
        spinnerEl.classList.toggle('d-none');
        let inputText = searchInputEl.value;
       let url = "https://apis.ccbp.in/wiki-search?search="+inputText;
       let option = {
           method :"GET"
       }
       fetch(url, option)
       .then(function(response){
           return response.json();
       })
       .then(function(jsonData){
          let {search_results}=jsonData;
          displayResults(search_results);
       })
    }
}

searchInputEl.addEventListener("keydown", searchWikepedia);